{{- /* chezmoi:modify-template */ -}}
# Reset PATH
set -gx PATH $HOME/.local/bin /usr/local/bin /System/Cryptexes/App/usr/bin /usr/bin /bin /usr/sbin /sbin /var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/local/bin /var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/bin /var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/appleinternal/bin /Applications/kitty.app/Contents/MacOS

# Shorten zellij socket dir to avoid 103-byte Unix socket path limit on macOS
set -gx ZELLIJ_SOCKET_DIR /tmp/zellij-(id -u)

# Load homebrew
/opt/homebrew/bin/brew shellenv fish | source

# Load mise
if type -q mise
    mise activate fish | source
end

if status is-interactive
    # Commands to run in interactive sessions can go here
    set -xg EDITOR nvim
    if not test -f ~/.config/fish/completions/chezmoi.fish
        chezmoi completion fish --output=~/.config/fish/completions/chezmoi.fish
    end

    if not test -f ~/.config/fish/completions/mise.fish
        mise completion fish > ~/.config/fish/completions/mise.fish
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

    # Auto-attach to a default zellij session so `wt switch` hooks always
    # have a multiplexer client to act on. `exec` replaces fish so this
    # process doesn't sit underneath; panes spawned inside the session
    # have $ZELLIJ set and skip this guard.
    # `--forget` discards any serialized state for `main` so a new terminal
    # window starts with a clean session instead of resurrecting old panes
    # and cwds. Worktree sessions (created via the post-switch hook) are
    # unaffected and keep their state across resurrections.
    if not set -q ZELLIJ; and command -q zellij
        exec zellij attach --forget -c main
    end
end
# --- END ---
{{- .chezmoi.stdin | splitList "# --- END ---" | rest | join "\n" -}}
