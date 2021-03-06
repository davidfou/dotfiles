function! myspacevim#before() abort
  let g:coc_config_home = '~/.SpaceVim.d/'
  let g:coc_global_extensions = [
    \'coc-eslint',
    \'coc-html',
    \'coc-json',
    \'coc-marketplace',
    \'coc-prettier',
    \'coc-spell-checker',
    \'coc-svelte',
    \'coc-tsserver'
    \]
  " Use sh intead of fish in neovim (fix checkhealth)
  set shell=/bin/sh

  " Use eslint for typescript files
  let g:neomake_typescript_enabled_makers = ['eslint']
  let g:neomake_typescript_eslint_args = ['-f', 'compact', '--fix']
endfunction

function! myspacevim#after() abort
endfunction
