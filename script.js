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

form?.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const name = String(formData.get("name") || "").trim();
  const contact = String(formData.get("contact") || "").trim();
  const type = String(formData.get("type") || "").trim();

  if (!name || !contact || !type) {
    status.textContent = "请先填写姓名、联系方式和咨询类型。";
    return;
  }

  status.textContent = "已记录你的咨询信息。正式上线后这里会接入邮箱、表格或企业微信通知。";
  form.reset();
});
