# Load asdf
source ~/.asdf/asdf.fish

# Load powerline bindings
if type -q powerline-daemon
  powerline-daemon -q
  set fish_function_path $fish_function_path "$ASDF_DIR/installs/python/3.9.2/lib/python3.9/site-packages/powerline/bindings/fish"
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

# Setup theme
# To avoid tmux to be blocked (https://github.com/tomyun/base16-fish/issues/7)
if test -f ~/.config/fish/conf.d/base16.fish
  rm ~/.config/fish/conf.d/base16.fish
end
if status --is-interactive && test -z "$TMUX"
  base16-solarized-dark
end

# Add op helper
function op_signin
    set -xg OP_SESSION_my (op signin my --raw)
end

set -xg EDITOR nvim
set -xg DOCKER_HOST unix:///run/user/(id -u)/docker.sock
set -xg TMUX_BASE16_THEME $base16_theme
