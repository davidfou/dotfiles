# Load asdf
source ~/.asdf/asdf.fish

# Load powerline bindings
if type -q powerline-daemon
  powerline-daemon -q
# set fish_function_path $fish_function_path "$HOMEBREW_PREFIX/lib/python3.7/site-packages/powerline/bindings/fish"
  set -x POWERLINE_NO_SHELL_PROMPT 0
  powerline-setup
  set -e POWERLINE_NO_SHELL_PROMPT
end

# Install fisher
if not functions -q fisher
    set -q XDG_CONFIG_HOME; or set XDG_CONFIG_HOME ~/.config
    curl https://git.io/fisher --create-dirs -sLo $XDG_CONFIG_HOME/fish/functions/fisher.fish
    fish -c fisher
end

if set -qU base16_theme; and not set -qx base16_theme
    set -xU base16_theme $base16_theme
end
