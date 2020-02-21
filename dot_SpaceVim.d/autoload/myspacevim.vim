function! myspacevim#before() abort
  " Use sh intead of fish in neovim (fix checkhealth)
  set shell=/bin/sh

  " Use eslint for typescript files
  let g:neomake_typescript_enabled_makers = ['eslint']
  let g:neomake_typescript_eslint_args = ['-f', 'compact', '--fix']
endfunction

function! myspacevim#after() abort
endfunction
