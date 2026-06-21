const revealItems = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const wechatButton = document.querySelector(".wechat-copy");
const form = document.querySelector("#leadForm");
const status = document.querySelector("#formStatus");

wechatButton?.addEventListener("click", async () => {
  const wechat = wechatButton.dataset.wechat;
  let copied = false;

  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(wechat);
      copied = true;
    }
  } catch {
    copied = false;
  }

  if (!copied) {
    const textArea = document.createElement("textarea");
    textArea.value = wechat;
    textArea.setAttribute("readonly", "");
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    document.body.appendChild(textArea);
    textArea.select();
    copied = document.execCommand("copy");
    textArea.remove();
  }

  wechatButton.textContent = copied ? "微信号已复制：AITony9316" : "微信号：AITony9316";

  window.setTimeout(() => {
    wechatButton.textContent = "复制微信号：AITony9316";
  }, 2400);
});

form?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const name = String(formData.get("name") || "").trim();
  const contact = String(formData.get("contact") || "").trim();
  const type = String(formData.get("type") || "").trim();
  const message = String(formData.get("message") || "").trim();

  if (!name || !contact || !type) {
    status.textContent = "请先填写姓名、联系方式和咨询类型。";
    return;
  }

  const submitButton = form.querySelector(".form-submit");
  submitButton.disabled = true;
  submitButton.textContent = "提交中...";
  status.textContent = "";

  try {
    const response = await fetch("/api/lead", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name, contact, type, message }),
    });
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "提交失败，请稍后重试。");
    }

    status.textContent = result.message || "提交成功，我们会尽快联系你。";
    form.reset();
  } catch (error) {
    status.textContent = error.message || "提交失败，请添加微信 AITony9316 咨询。";
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "提交咨询";
  }
});
