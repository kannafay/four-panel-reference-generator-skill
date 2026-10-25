# 人物四格参考图

生成同一人物的正面半身、侧面半身、正面全身和背面全身参考图。默认中文标签、灰色影棚和白色十字线，整图与每格均为竖版 9:16。详细规则见[技能说明](SKILL.md)。

## 安装与使用

下载仓库，将包含 `SKILL.md` 的目录放入 `~/.agents/skills/four-panel-reference-generator/`。Windows 对应位置为 `%USERPROFILE%\.agents\skills\four-panel-reference-generator\`。

附上人物参考图并输入 `$four-panel-reference-generator`，也可直接描述人物；若技能未出现，重新打开 Codex。安装说明见 [OpenAI 官方文档](https://learn.chatgpt.com/docs/build-skills)。

## 构建与测试

在仓库目录运行：

```powershell
pnpm install --frozen-lockfile
pnpm test
pnpm build
```

压缩包输出到 `dist/four-panel-reference-generator-skill-<版本号>.zip`，版本号取自 `package.json`。解压后将 `four-panel-reference-generator/` 放入技能目录即可；压缩包仅含技能、说明和许可证。

## 许可

[MIT 许可证](LICENSE)，保留许可原文。
