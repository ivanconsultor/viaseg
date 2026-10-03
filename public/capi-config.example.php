<?php
/**
 * Modelo de configuracao da API de Conversoes da Meta.
 *
 * COMO USAR
 *   1. copie este arquivo para  public/capi-config.php
 *   2. preencha o token
 *   3. o capi-config.php esta no .gitignore e NUNCA deve ser commitado
 *
 * O build do Next copia tudo que esta em public/ para out/, entao o
 * capi-config.php vai junto no ZIP de entrega sem nenhum passo extra.
 *
 * Sem este arquivo o formulario continua funcionando normalmente: o
 * send.php so deixa de enviar o evento para a Meta.
 *
 * ONDE PEGAR O TOKEN
 *   Gerenciador de Eventos > Conjunto de dados "Pixel ViaSeg" >
 *   Configuracoes > API de Conversoes > Gerar token de acesso.
 *   O mesmo token esta na tag "FB API" do conteiner servidor GTM-KW5B6Z6P.
 *   Ao trocar o token, trocar NOS DOIS lugares.
 */

// Pixel ativo. O desativado 4860127807422598 nao deve ser usado aqui.
define("VIASEG_CAPI_PIXEL_ID", "526511238923127");

define("VIASEG_CAPI_TOKEN", "COLE_AQUI_O_TOKEN_DA_API_DE_CONVERSOES");

/**
 * Codigo de teste do Gerenciador de Eventos (aba "Eventos de teste").
 * Preenchido, os eventos aparecem SO no teste e nao entram na conta real.
 * Deixar vazio em producao.
 */
define("VIASEG_CAPI_TEST_CODE", "");
