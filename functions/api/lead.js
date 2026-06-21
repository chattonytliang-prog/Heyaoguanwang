export async function onRequestPost(context) {
  try {
    const webhook = context.env.FEISHU_WEBHOOK;

    if (!webhook) {
      return jsonResponse({ message: "Missing FEISHU_WEBHOOK" }, 500);
    }

    const payload = await context.request.json();
    const name = sanitize(payload.name);
    const contact = sanitize(payload.contact);
    const type = sanitize(payload.type);
    const message = sanitize(payload.message);

    if (!name || !contact || !type) {
      return jsonResponse({ message: "请填写姓名、联系方式和咨询类型。" }, 400);
    }

    const text = [
      "官网咨询",
      "",
      `姓名：${name}`,
      `联系方式：${contact}`,
      `咨询类型：${type}`,
      `需求描述：${message || "未填写"}`,
      "",
      `提交时间：${new Date().toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" })}`,
    ].join("\n");

    const feishuResponse = await fetch(webhook, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        msg_type: "text",
        content: { text },
      }),
    });

    if (!feishuResponse.ok) {
      return jsonResponse({ message: "飞书通知发送失败。" }, 502);
    }

    return jsonResponse({ message: "提交成功，我们会尽快联系你。" });
  } catch (error) {
    return jsonResponse({ message: "提交失败，请稍后重试。" }, 500);
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: corsHeaders(),
  });
}

function sanitize(value) {
  return String(value || "").trim().slice(0, 800);
}

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      ...corsHeaders(),
    },
  });
}

function corsHeaders() {
  return {
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "POST, OPTIONS",
    "access-control-allow-headers": "content-type",
  };
}
