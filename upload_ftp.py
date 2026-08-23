import os
import sys
import ftplib

def load_env(filepath):
    """Lê variáveis de ambiente de um arquivo .env de forma simples e sem dependências externas."""
    env_data = {}
    if not os.path.exists(filepath):
        print(f"Erro: O arquivo de configurações '{filepath}' não foi encontrado.")
        print("Por favor, crie o arquivo com base no modelo criado.")
        return None
    
    with open(filepath, 'r', encoding='utf-8') as f:
        for line in f:
            line = line.strip()
            # Ignora linhas vazias ou comentários
            if not line or line.startswith('#'):
                continue
            if '=' in line:
                key, val = line.split('=', 1)
                val = val.strip().strip('"').strip("'")
                env_data[key.strip()] = val
    return env_data

def upload_dir_recursive(ftp, local_dir):
    """Envia arquivos e subpastas recursivamente via FTP mantendo a estrutura local."""
    for item in os.listdir(local_dir):
        local_path = os.path.join(local_dir, item)
        
        if os.path.isfile(local_path):
            print(f"Enviando: {item} ... ", end="", flush=True)
            try:
                with open(local_path, 'rb') as f:
                    ftp.storbinary(f'STOR {item}', f)
                print("OK")
            except Exception as e:
                print(f"FALHA! Erro: {e}")
                
        elif os.path.isdir(local_path):
            print(f"\nCriando/Acessando diretório remoto: {item}")
            # Tenta criar a pasta no servidor
            try:
                ftp.mkd(item)
                print(f"-> Pasta '{item}' criada com sucesso.")
            except Exception:
                # Se der erro, geralmente é porque a pasta já existe
                print(f"-> Pasta '{item}' já existente no servidor.")
            
            # Entra na pasta remota, faz o upload dos itens dela, e depois volta
            try:
                ftp.cwd(item)
                upload_dir_recursive(ftp, local_path)
                ftp.cwd('..')
                print(f"Voltando para o diretório superior do FTP.\n")
            except Exception as e:
                print(f"Erro ao entrar ou subir itens na pasta remota '{item}': {e}")

def main():
    print("==================================================")
    print("   SISTEMA DE DEPLOY AUTOMÁTICO - VIASEG (FTP)   ")
    print("==================================================\n")
    
    # 1. Carrega as credenciais
    env_file = ".env.production"
    config = load_env(env_file)
    if not config:
        sys.exit(1)
        
    host = config.get("FTP_HOST")
    user = config.get("FTP_USER")
    passwd = config.get("FTP_PASS")
    port = int(config.get("FTP_PORT", 21))
    remote_dir = config.get("FTP_DIR", "public_html")
    
    # Validação simples
    if not host or not user or not passwd or host == "ftp.seudominio.com.br" or user == "usuario_cpanel":
        print("Erro: As credenciais no arquivo '.env.production' ainda não foram preenchidas corretamente.")
        print("Por favor, edite o arquivo '.env.production' com seus dados da Hostinger e tente novamente.\n")
        sys.exit(1)
        
    local_build_dir = "out"
    if not os.path.exists(local_build_dir):
        print(f"Erro: A pasta local de build '{local_build_dir}' não foi encontrada.")
        print("Certifique-se de executar 'npm run build' antes de rodar este script de deploy.")
        sys.exit(1)
        
    # 2. Conecta ao FTP
    print(f"Conectando ao servidor FTP: {host}:{port} ...")
    usar_tls = str(config.get("FTP_TLS", "true")).strip().lower() in ("1", "true", "sim", "yes")
    # FTP puro manda usuario e senha em texto legivel pela rede. Com FTPS a
    # conexao e criptografada. So caia para FTP puro se o plano nao suportar.
    ftp = ftplib.FTP_TLS() if usar_tls else ftplib.FTP()
    try:
        ftp.connect(host, port, timeout=30)
        ftp.login(user, passwd)
        if usar_tls:
            ftp.prot_p()  # criptografa tambem a transferencia dos arquivos
            print("Conexao criptografada (FTPS) ativa.")
        print("Conectado e autenticado com sucesso! 🎉")
    except Exception as e:
        print(f"\nErro crítico de conexão FTP: {e}")
        print("Verifique se o Host, Usuário e Senha no arquivo '.env.production' estão corretos.")
        print("Também verifique se o seu IP local não foi temporariamente bloqueado pelo firewall da Hostinger.\n")
        sys.exit(1)
        
    # 3. Navega para a pasta destino
    print(f"\nNavegando para o diretório de destino: {remote_dir} ...")
    try:
        ftp.cwd(remote_dir)
        print(f"Diretório atual no FTP: {ftp.pwd()}")
    except Exception as e:
        print(f"Erro ao acessar o diretório '{remote_dir}' no servidor: {e}")
        print("Tentando criar o diretório...")
        try:
            ftp.mkd(remote_dir)
            ftp.cwd(remote_dir)
            print(f"Diretório '{remote_dir}' criado e acessado no FTP.")
        except Exception as err:
            print(f"Não foi possível acessar ou criar o diretório remoto '{remote_dir}': {err}")
            ftp.quit()
            sys.exit(1)
            
    # 4. Inicia o Deploy recursivo
    print("\nIniciando o upload dos arquivos da pasta local 'out'...\n")
    try:
        upload_dir_recursive(ftp, local_build_dir)
        print("\n==================================================")
        print("        DEPLOY FINALIZADO COM SUCESSO! 🎉        ")
        print("   O seu site está atualizado na Hostinger!   ")
        print("==================================================")
    except Exception as e:
        print(f"\nOcorreu um erro durante o upload dos arquivos: {e}")
    finally:
        try:
            ftp.quit()
            print("\nConexão FTP encerrada com segurança.")
        except Exception:
            pass

if __name__ == "__main__":
    main()
