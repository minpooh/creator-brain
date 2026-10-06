import { NextResponse } from "next/server";
import OpenAI from "openai";

import { createClient } from "@/lib/supabase/server";

const MIN_CONTENT_COUNT = 5;

function createOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return null;
  }

  return new OpenAI({ apiKey });
}

export async function POST() {
  try {
    // --------------------------------------------------
    // 1. Supabase client
    // --------------------------------------------------
    const supabase = await createClient();

    // --------------------------------------------------
    // 2. 로그인 사용자 확인
    // --------------------------------------------------
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 },
      );
    }

    // --------------------------------------------------
    // 3. 사용자의 콘텐츠 조회
    // --------------------------------------------------
    const { data: contents, error: contentsError } = await supabase
      .from("contents")
      .select(
        `
          id,
          platform,
          content_type,
          title,
          description,
          url,
          views,
          likes,
          published_at,
          created_at
        `,
      )
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (contentsError) {
      console.error("콘텐츠 조회 실패:", contentsError);

      return NextResponse.json(
        { error: "콘텐츠를 조회하지 못했습니다." },
        { status: 500 },
      );
    }

    const contentList = contents ?? [];

    // --------------------------------------------------
    // 4. 최소 콘텐츠 개수 확인
    // --------------------------------------------------
    if (contentList.length < MIN_CONTENT_COUNT) {
      return NextResponse.json(
        {
          error: `분석을 위해 최소 ${MIN_CONTENT_COUNT}개의 콘텐츠가 필요합니다.`,
        },
        { status: 400 },
      );
    }

    // --------------------------------------------------
    // 5. AI에 전달할 데이터 정리
    // --------------------------------------------------
    const analysisInput = contentList.map((content) => ({
      platform: content.platform,
      contentType: content.content_type,
      title: content.title,
      description: content.description ?? "",
      url: content.url ?? "",
      views: content.views ?? 0,
      likes: content.likes ?? 0,
      publishedAt: content.published_at ?? null,
    }));

    // --------------------------------------------------
    // 6. OpenAI 분석 요청
    // --------------------------------------------------
    const openai = createOpenAIClient();

    if (!openai) {
      console.error("OPENAI_API_KEY is not set");

      return NextResponse.json(
        { error: "분석을 실행하지 못했습니다." },
        { status: 500 },
      );
    }

    const response = await openai.responses.create({
      model: "gpt-6-luna",

      instructions: `
당신은 크리에이터 콘텐츠 전략 분석 전문가입니다.

사용자가 등록한 기존 콘텐츠를 분석하여
크리에이터의 정체성, 강점, 패턴, 콘텐츠 필러,
향후 콘텐츠 방향과 추천 아이디어를 도출합니다.

중요한 원칙:

1. 제공된 콘텐츠 데이터만 근거로 분석합니다.
2. 콘텐츠에 존재하지 않는 사실을 단정하지 않습니다.
3. 충분한 근거가 없는 경우 추정이라고 표현하지 않고,
   보수적으로 판단합니다.
4. 단순히 콘텐츠 제목을 반복하지 말고
   여러 콘텐츠에서 반복적으로 나타나는 특징을 찾아냅니다.
5. 조회수와 좋아요 데이터가 있다면 상대적인 반응 차이를
   분석에 활용합니다.
6. URL을 직접 방문하거나 외부 정보를 가져왔다고 가정하지 않습니다.
7. 결과는 반드시 지정된 JSON Schema를 따릅니다.

Creator Brain의 목적은
"이 크리에이터가 누구인지 발견하고,
무엇을 잘하고 있으며,
앞으로 어떤 콘텐츠를 만들면 좋을지"
알려주는 것입니다.
      `,

      input: [
        {
          role: "user",
          content: `
다음은 한 크리에이터가 등록한 콘텐츠 목록입니다.

${JSON.stringify(analysisInput, null, 2)}

이 콘텐츠들을 종합적으로 분석해주세요.

특히 다음을 분석해주세요.

- Creator Identity
- Content Strength
- Content Pattern
- Content Pillar
- Content Direction
- 다음 콘텐츠 추천 아이디어
          `,
        },
      ],

      text: {
        format: {
          type: "json_schema",
          name: "creator_analysis",
          strict: true,
          schema: {
            type: "object",
            properties: {
              identity: {
                type: "string",
                description:
                  "이 크리에이터를 가장 잘 설명하는 핵심 정체성",
              },

              strengths: {
                type: "object",
                properties: {
                  strengths: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },

                  patterns: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                },
                required: ["strengths", "patterns"],
                additionalProperties: false,
              },

              direction: {
                type: "object",
                properties: {
                  summary: {
                    type: "string",
                    description: "이 크리에이터가 앞으로 어떤 방향으로 콘텐츠를 운영하면 좋을지에 대한 전체적인 방향",
                  },
              
                  mainPillar: {
                    type: "string",
                    description: "콘텐츠의 가장 중요한 메인 콘텐츠 축",
                  },
              
                  subPillars: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                    description: "메인 콘텐츠 축을 보완하는 세부 콘텐츠 축",
                  },
              
                  tone: {
                    type: "string",
                    description: "추천하는 콘텐츠의 전체적인 톤앤매너",
                  },
              

                  priorities: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        title: {
                          type: "string",
                        },
                        description: {
                          type: "string",
                        },
                        reason: {
                          type: "string",
                        },
                      },
                      required: [
                        "title",
                        "description",
                        "reason",
                      ],
                      additionalProperties: false,
                    },
                  },
                },
                required: [
                    "summary",
                    "mainPillar",
                    "subPillars",
                    "tone",
                    "priorities",
                ],
                additionalProperties: false,
              },

              recommendations: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    title: {
                      type: "string",
                    },
                    pillar: {
                      type: "string",
                    },
                    description: {
                      type: "string",
                    },
                    reason: {
                      type: "string",
                    },
                  },
                  required: [
                    "title",
                    "pillar",
                    "description",
                    "reason",
                  ],
                  additionalProperties: false,
                },
              },
            },

            required: [
              "identity",
              "strengths",
              "direction",
              "recommendations",
            ],

            additionalProperties: false,
          },
        },
      },
    });

    // --------------------------------------------------
    // 7. OpenAI 결과 JSON 파싱
    // --------------------------------------------------
    if (!response.output_text) {
      console.error("OpenAI 응답이 비어 있습니다.");

      return NextResponse.json(
        { error: "AI 분석 결과를 받지 못했습니다." },
        { status: 500 },
      );
    }

    let analysisResult;

    try {
      analysisResult = JSON.parse(response.output_text);
    } catch (parseError) {

        
      console.error("AI 결과 JSON 파싱 실패:", parseError);
      console.error("OpenAI raw output:", response.output_text);

      return NextResponse.json(
        { error: "AI 분석 결과를 처리하지 못했습니다." },
        { status: 500 },
      );
    }

    // --------------------------------------------------
    // 8. analyses 테이블 저장
    // --------------------------------------------------
    const { data: analysis, error: analysisError } = await supabase
      .from("analyses")
      .insert({
        user_id: user.id,

        identity: analysisResult.identity,

        strengths: analysisResult.strengths,

        direction: analysisResult.direction,

        recommendations: analysisResult.recommendations,

        analyzed_content_count: contentList.length,
      })
      .select()
      .single();

    if (analysisError) {
      console.error("분석 결과 저장 실패:", analysisError);

      return NextResponse.json(
        { error: "분석 결과를 저장하지 못했습니다." },
        { status: 500 },
      );
    }

    // --------------------------------------------------
    // 9. frontend에 결과 반환
    // --------------------------------------------------
    return NextResponse.json({
      success: true,
      analysis,
    });
  } catch (error) {
    console.error("========== AI 분석 실패 ==========");
    console.error(error);

    if (error instanceof Error) {
        console.error("message:", error.message);
        console.error("stack:", error.stack);
    }

    console.error("================================");

    return NextResponse.json(
      { error: "AI 분석 중 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}