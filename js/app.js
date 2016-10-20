(function(){
    
    angular.module('NarrowItDownApp',[])
    .controller('NarrowItDownController',NarrowItDownController)
    .service('MenuSearchService',MenuSearchService)
    .directive('foundItems',foundItems);
    
    NarrowItDownController.$inject=['MenuSearchService'];
    
    MenuSearchService.$inject=['$http'];
    
    function foundItems()
    {
        var ddo={
            scope: {
                foundItems: '<itemsList',
                deleteThisItem: '&onRemove'
            },
            templateUrl: 'hotelmenudetail.html',
            controller:  DirectiveController,
            controllerAs: 'ctrl',
            bindToController: true,
            
        };
        return ddo;
    }
    
    function DirectiveController()
    {
        var vm=this;
/*        vm.checkIfEmpty=function()
        {
        if(vm.foundItems.length===0)
            return true;
            else
                return false;
        }
*/        
    }
    function MenuSearchService($http)
    {
        var service=this;
        service.getMatchedMenuItems=function(item)
        {
            return $http.get('https://davids-restaurant.herokuapp.com/menu_items.json').then(function(resultData){
                //alert(result);
//                console.log(JSON.stringify(resultData));
                var founditems=[];
//                alert(result.length);
                var result=resultData.data;
                var items=result.menu_items;
                for(var i=0;i<items.length;++i)
                    {
                        var itempart=items[i];
//                        console.log(JSON.stringify(itempart));
                        if(itempart.description.indexOf(item)!=-1)
                            founditems.push(itempart);
                    }
//                console.log(founditems);
                return founditems;
            });
        }
    }
    function NarrowItDownController(MenuSearchService)
    {
        var vm=this;
        vm.foundItems=[];
        vm.searchText="";
        vm.checkIfZero=false;
        vm.getMatchedMenuItems=function()
        {
            vm.checkIfZero=false;
//            alert("entered"+vm.searchText);
            if(vm.searchText==='')
                {
//                    alert("it is blank");
                    vm.checkIfZero=true;
                    return;
                }
            MenuSearchService.getMatchedMenuItems(vm.searchText).then(function(result)
                                                                   {
//                console.log("in constollersearch"); 
                vm.foundItems=result; 
                if(vm.foundItems.length===0)
                vm.checkIfZero=true;
//                console.log(vm.foundItems);
            });
        }
        
        vm.deleteItem=function(index)
        {
            vm.foundItems.splice(index,1);
        }
    }
    
})();