{{- /* chezmoi:modify-template */ -}}
# Reset PATH
set -gx PATH $HOME/.local/bin /usr/local/bin /System/Cryptexes/App/usr/bin /usr/bin /bin /usr/sbin /sbin /var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/local/bin /var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/bin /var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/appleinternal/bin /Applications/kitty.app/Contents/MacOS

# Load homebrew
/opt/homebrew/bin/brew shellenv fish | source

# Load asdf
source ~/.asdf/asdf.fish

if status is-interactive
    # Commands to run in interactive sessions can go here
    set -xg EDITOR nvim
    if not test -f ~/.config/fish/completions/asdf.fish
        mkdir -p ~/.config/fish/completions
        ln -s ~/.asdf/completions/asdf.fish ~/.config/fish/completions
    end

    if not test -f ~/.config/fish/completions/chezmoi.fish
        chezmoi completion fish --output=~/.config/fish/completions/chezmoi.fish
    end

    if test -f ~/.config/fish/themes/TokyoNight\ Storm.theme
        fish_config theme choose "TokyoNight Storm"
    end
    kitty +kitten themes --reload-in=all "Tokyo Night Storm"

    if type -q op
        op completion fish | source
    end

    if type -q starship
        starship init fish | source
    end

    set -xg TMUX_POWERLINE_DIR_USER_SEGMENTS ~/.config/tmux-powerline/segments
    set -xg TMUX_POWERLINE_DIR_USER_THEMES ~/.config/tmux-powerline/themes
    set -xg TMUX_POWERLINE_THEME my-theme
end
# --- END ---
{{- .chezmoi.stdin | splitList "# --- END ---" | rest | join "\n" -}}
