/**
 * JavaScript 使用 fetch API 与 Ollama 交互：
 */

// 生成文本
// 生成文本
fetch("http://localhost:11434/api/generate", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    model: "deepseek-r1:1.5b",
    prompt: "你好，你能帮我写一段Java代码吗？",
    stream: false
  })
})
  .then(response => response.json())
  .then(data => console.log(data));