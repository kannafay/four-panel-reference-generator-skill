# 人物四格参考图

生成同一人物的四视角参考图，具体规则见[技能说明](SKILL.md)。

## 安装与使用

下载仓库，将包含 `SKILL.md` 的目录放入 `~/.agents/skills/人物四格参考图/`。Windows 对应位置为 `%USERPROFILE%\.agents\skills\人物四格参考图\`。

附上人物参考图并输入 `$人物四格参考图`，也可直接描述人物；若技能未出现，重新打开 Codex。安装说明见 [OpenAI 官方文档](https://learn.chatgpt.com/docs/build-skills)。

## 构建与测试

在仓库目录运行：

```powershell
pnpm install --frozen-lockfile
pnpm test
pnpm build
```

压缩包输出到 `dist/four-panel-reference-generator-skill-<版本号>.zip`，版本号取自 `package.json`。解压后将 `人物四格参考图/` 放入技能目录即可，其中仅含 `SKILL.md` 和 `LICENSE`。

## 许可

[MIT 许可证](LICENSE)，保留许可原文。
