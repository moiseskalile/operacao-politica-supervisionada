﻿'use strict';

app.controller('DeputadoListaController', ["$scope", "$tabela", "$api", "$queryString",
    function ($scope, $tabela, $api, $queryString) {
    	var init = function () {
    		$scope.filtro = {};

    		var qs = $queryString.search();
    		if (qs.page) {
    			$tabela.params.page = parseInt(qs.page);
    		}
    		if (qs.sorting) {
    			var lstSorting = qs.sorting.split(' ');
    			$tabela.params.sorting = {};
    			$tabela.params.sorting[lstSorting[0]] = lstSorting[1];
    		}

    		OPS.select("#lstParlamentar", "./Api/Deputado/Pesquisa", qs.IdParlamentar);
    		$scope.filtro.IdParlamentar = qs.IdParlamentar;

    		OPS.select("#lstDespesa", "./Api/Deputado/TipoDespesa", qs.Despesa);
    		$scope.filtro.Despesa = qs.Despesa;

    		OPS.select("#lstFornecedor", "./Api/Fornecedor/Pesquisa", qs.Fornecedor);
    		$scope.filtro.Fornecedor = qs.Fornecedor;

    		//OPS.select("#lstUF", "./Api/Uf/Pesquisa", qs.Uf);
    		$("#lstUF").select2({
    			data: lstEstadosBrasileiros,
    			allowClear: true,
    			placeholder: "Selecione",
    			selectOnClose: false
    		});
    		if (qs.Uf) $("#lstUF").val(qs.Uf.split(','));
    		$scope.filtro.Uf = qs.Uf;

    		//OPS.select("#lstPartido", "./Api/Partido/Pesquisa", qs.Partido);
    		$("#lstPartido").select2({
    			data: lstPartidosBrasileiros,
    			allowClear: true,
    			placeholder: "Selecione",
    			selectOnClose: false
    		});
    		$scope.filtro.Partido = qs.Partido;

    		$("#txtDocumento").val(qs.Documento);
    		$scope.filtro.Documento = qs.Documento || null;

    		$scope.filtro.Periodo = $("#lstPerido").val(qs.Periodo || "3").val();
    		$scope.filtro.Agrupamento = $("#lstAgrupamento").val(qs.Agrupamento || "1").val();

    		$scope.Pesquisar(true);
    	}

    	$scope.Pesquisar = function (page_load) {
    		switch ($("#lstAgrupamento").val()) {
    			case '2': $scope.visao = 'despesa.html'; break;
    			case '3': $scope.visao = 'fornecedor.html'; break;
    			case '4': $scope.visao = 'partido.html'; break;
    			case '5': $scope.visao = 'uf.html'; break;
    			case '6': $scope.visao = 'documento.html'; break;
    			default: $scope.visao = 'parlamentar.html';
    		}

    		if (!page_load) {
    			$scope.filtro.IdParlamentar = $("#lstParlamentar").val();
    			$scope.filtro.Despesa = $("#lstDespesa").val();
    			$scope.filtro.Uf = $("#lstUF").val();
    			$scope.filtro.Partido = $("#lstPartido").val();
    			$scope.filtro.Fornecedor = $("#lstFornecedor").val();
    			$scope.filtro.Documento = $("#txtDocumento").val() || null;
    			$scope.filtro.Periodo = $("#lstPerido").val();
    			$scope.filtro.Agrupamento = $("#lstAgrupamento").val();

    			delete $tabela.params.sorting;
    			$tabela.params.page = 1;
    		}
    		$scope.BuscaGrid();
    	};

    	$scope.BuscaGrid = function () {
    		$scope.tableParams = $tabela.databind('Deputado/Lancamentos', $scope.filtro);
    	}

    	$scope.LimparFiltros = function () {
    		$("#lstParlamentar, #lstDespesa, #lstUF, #lstPartido, #lstFornecedor").val([]).trigger('change');
    		$("#txtDocumento").val('');
    		$("#lstPerido").val('3');
    		$("#lstAgrupamento").val('1');
    	}

    	init();
    }]);