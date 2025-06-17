return {
  "nvim-neotest/neotest",
  dependencies = {
    "marilari88/neotest-vitest",
    "thenbe/neotest-playwright",
    dependencies = "nvim-telescope/telescope.nvim",
  },
  opts = {
    adapters = {
      ["neotest-vitest"] = {},
      ["neotest-playwright"] = {
        persist_project_selection = true,
        enable_dynamic_test_discovery = true,
      },
    },
  },
}
