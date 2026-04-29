export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新增功能
        'fix', // 修复缺陷
        'docs', // 文档更新
        'style', // 格式调整
        'refactor', // 代码重构
        'perf', // 性能优化
        'test', // 测试相关
        'build', // 构建相关
        'ci', // CI 配置相关
        'chore', // 其他修改
        'merge', // 合并分支
        'revert', // 回退提交
      ],
    ],
    'subject-case': [0],
  },
}
