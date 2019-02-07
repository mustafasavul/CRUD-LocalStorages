var toDoList = [];

$(function () {

    /**
     * save click
     */
    $("#form-action").on('click', function () {
        var id = $("#id").val();
        if (id === '') {
            create();
        } else {
            update(id);
        }

        $("#form").modal('hide');
        $('#id').val('');
        $('#description').val('');
        $('#title').val('');
    });


    /**
     * Delete Button
     * */
    $("#deleteItem").on('click', function () {
        var id = $("#id").val();
        if (id !== '') {
            deleteObj(id);
        } else {
            alert("Calm Down Bro This Area Not Empty!");
        }

    });


    /**
     *
     * Sort
     *
     * */

    var defaultSortType = 'DESC';
    if(localStorage.getItem('SORT')) {
        defaultSortType = localStorage.getItem('SORT');
    }
    $("#sort").on('click', function () {
        sortList(defaultSortType);
        if (defaultSortType === 'DESC') {
            defaultSortType = 'ASC';
        }else {
            defaultSortType = 'DESC'
        }
        localStorage.setItem('SORT', defaultSortType);
    });

    /**
     *  create todoItem
     */
    function create() {
        var obj = {
            'id': new Date().getTime().toString(),
            'title': $('#title').val(),
            'description': $('#description').val()
        };
        toDoList.push(obj);
        printItems();
    }

    /**
     * update todoitem
     * @param: ID
     */

    function update(ID) {
        var obj = {
            'id': ID,
            'title': $('#title').val(),
            'description': $('#description').val()
        };

        var index = findItem(ID);
        if (index !== -1) {
            toDoList[index] = obj;
        }
        printItems();
    }


    /**
     * delete todoitem
     * @param: ID
     */

    function deleteObj(ID) {
        var index = findItem(ID);
        if (index !== -1) {
            toDoList.splice(index, 1);
        }
        printItems();
    }

    /**
     * get todolist
     */
    function getTodoList() {
        if (localStorage.getItem('todolist')) {
            toDoList = JSON.parse(localStorage.getItem('todolist'));
            printItems();
        }
    }

    /**
     *   Render Items in HTML
     */


    function printItems() {
        $(".list").empty();

        toDoList.forEach(function (value) {
            $(".list").append("  <div class=\"list-group mb-3\" data-id=" + value.id + ">\n" +
                "                <a href=\"#\" class=\"list-group-item list-group-item-action\">\n" +
                "                    <div class=\"d-flex w-100 justify-content-between\">\n" +
                "                        <h5 class=\"mb-1 list-title\">" + value.title + "</h5>\n" +
                "                    </div>\n" +
                "                    <p class=\"mb-1 list-desc\">" + value.description + "</p>\n" +
                "                </a>\n" +
                "            </div>")
        });

        localStorage.setItem('todolist', JSON.stringify(toDoList));

        // List Group Click TODO

        $(".list-group").on('click', function () {
            var id = $(this).data("id");
            var index = findItem(id);
            if (index !== -1) {
                var todoItem = toDoList[index];
                todoAction(todoItem);
            }
        });

        //List Group Data-Attribute TODO


    }

    /**
     *    todoActions Modal Set
     */

    function todoAction(todoItem) {
        $('#id').val(todoItem.id);
        $('#description').val(todoItem.description);
        $('#title').val(todoItem.title);

        $('#form').modal('show');

    }


    /**
     * Find Itemby
     * @param: ID
     * Return todoitem
     */

    function findItem(ID) {
        var index = toDoList.map(function (todo) {
            return todo.id;
        }).indexOf(ID.toString());

        return index;
    }

   /** Sort List **/
    function sortList(sortType) {
        toDoList.sort(function (a, b) {
            return sortType === "DESC" ? b.id - a.id : a.id - b.id;
        });
        printItems();
    }

    getTodoList();
});