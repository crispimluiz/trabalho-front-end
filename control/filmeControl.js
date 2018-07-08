var app = angular.module('filmeModule',[]);

app.controller('filmeControl',function($scope,$http){
	var url = "http://localhost:8080/trabalho/rs/filme";
	
		$scope.pesquisar = function(){
			 $http.get(url).success(function(filmeRetorno){
				 $scope.filmes = filmeRetorno;
		}).error(function(mensagemErro){
			alert(mensagemErro);
		});
	}
	$scope.pesquisar();
	
		
	
	$scope.novo = function(){
		$scope.filme = {};
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
			if($scope.filme.id==''){
			$http.post(url,$scope.filme).success(function(filme){
			$scope.filmes.push($scope.filme);
			$scope.novo();
			}).error(function(erro){
				alert(erro)
			});
			$scope.mensagens.push('Filme salvo com sucesso!');
		}else{
			$http.put(url,$scope.filme).success(function(filme){
				$scope.pesquisar();
				$scope.novo();
			}).error(function(erro){
				alert(erro)
			});
		}
	}
	
	$scope.excluir = function() {
		if ($scope.filme.id == '') {
			alert('Selecione um Filme');
		} else {
			$scope.filmess.splice($scope.filmes.indexOf($scope.filme),1);
			$scope.pesquisar();
				$scope.novo();
				$scope.mensagens.push('Filme excluído com sucesso!!!');
		}
	}
	
	$scope.seleciona = function(filmeTabela) {
		$scope.filme = filmeTabela;
	}
	
	$scope.pesquisar();
	$scope.novo();
});