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
    },
  },
  config = function()
    require("neotest").setup({
      adapters = {
        require("neotest-playwright").adapter({
          options = {
            persist_project_selection = true,
            enable_dynamic_test_discovery = true,
          },
        }),
      },
    })
  end,
}
