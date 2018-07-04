var app = angular.module('clienteModule',[]);

app.controller('clienteControl',function($scope,$http){
	var url = "http://localhost:8080/trabalho/rs/cliente";
	
	/*$scope.clientes = [{'codigo':'1','nome':'carlos'},
	{'codigo':'2','nome':'marcos'}]*/
	
	$scope.pesquisar = function(){
			 $http.get(url).success(function(clienteRetorno){
				 $scope.clientes = clienteRetorno;
		}).error(function(mensagemErro){
			alert(mensagemErro);
		});
	}
	$scope.pesquisar();
	
	
	
	$scope.novo = function(){
		$scope.cliente = {};
		$scope.mensagens = [];
	}
	
	$scope.montaMensagemErro = function(listaErro) {
		$scope.mensagens = [];
		$scope.mensagens.push('Falha de validação retornada do servidor');
		angular.forEach(listaErro, function(value, key){
			 $scope.mensagens.push(value.message);
		});
	}

    $scope.salvar = function() {  
			if($scope.cliente.id==''){
			$http.post(url,$scope.cliente).success(function(cliente){
			$scope.clientes.push($scope.cliente);
			$scope.novo();
			}).error(function(erro){
				alert(erro)
			});
			$scope.mensagens.push('Cliente salvo com sucesso!');
		}else{
			$http.put(url,$scope.cliente).success(function(cliente){
				$scope.pesquisar();
				$scope.novo();
			}).error(function(erro){
				alert(erro)
			});
		}
	}
	
	$scope.excluir = function() {
		if ($scope.cliente.id == '') {
			alert('Selecione um cliente');
		} else {
			$scope.clientes.splice($scope.clientes.indexOf($scope.cliente),1);
			$scope.pesquisar();
				$scope.novo();
				$scope.mensagens.push('Cliente excluído com sucesso!!!');
		}
	}
	
	$scope.seleciona = function(clienteTabela) {
		$scope.cliente = clienteTabela;
	}
	
	$scope.pesquisar();
	$scope.novo();
});