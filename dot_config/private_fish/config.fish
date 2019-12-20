# Load Homebrew
eval (/home/linuxbrew/.linuxbrew/bin/brew shellenv)

# Load powerline bindings
powerline-daemon -q
set fish_function_path $fish_function_path "$HOMEBREW_PREFIX/lib/python3.7/site-packages/powerline/bindings/fish"
set -x POWERLINE_NO_SHELL_PROMPT 0
powerline-setup
set -e POWERLINE_NO_SHELL_PROMPT

# Install fisher
if not functions -q fisher
    set -q XDG_CONFIG_HOME; or set XDG_CONFIG_HOME ~/.config
    curl https://git.io/fisher --create-dirs -sLo $XDG_CONFIG_HOME/fish/functions/fisher.fish
    fish -c fisher
end
