﻿using System;

namespace OPS.Core
{
	public static class Padrao
	{
		public const string EmailEnvioErros = "vanderleidenir@hotmail.com";
		public const string EmailEnvioResumoImportacao = "vanderleidenir@hotmail.com;luciobig@ops.net.br";

        public static string ConnectionString;

		/// <summary>
		/// Quantidade padrão de Itens a Exibir nas Grids
		/// </summary>
		public static readonly int ITENS_POR_PAGINA = 100;

		/// <summary>
		/// Data da Ultima Importação da CEAP (Cota dos Deputados)
		/// </summary>
		public static DateTime DeputadoFederalUltimaAtualizacao;

		/// <summary>
		/// Data da Ultima Importação da CEAPs (Cota dos Senadores)
		/// </summary>
		public static DateTime SenadorUltimaAtualizacao;

		/// <summary>
		/// Data da Ultima Importação da Presenças (Deputados)
		/// </summary>
		public static DateTime DeputadoFederalPresencaUltimaAtualizacao;
	}
}
