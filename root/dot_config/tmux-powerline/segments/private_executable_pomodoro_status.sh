run_segment() {
  pomodoro_status=$(~/.config/tmux/plugins/tmux-pomodoro-plus/scripts/pomodoro.sh)
  echo "new ${pomodoro_status}"
  return 0
}
