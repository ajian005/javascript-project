/**
 * JavaScript 使用 fetch API 与 Ollama 交互：
 */

// 生成文本
fetch("http://localhost:11434/api/chat", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    model: "deepseek-r1:1.5b",
    messages: [
      {
        role: "user",
        content: "你好，你能帮我写一段 Python 代码吗？"
      }
    ],
    stream: false
  })
})
  .then(response => response.json())
  .then(data => {
    console.log('完整响应数据:', data);
  });