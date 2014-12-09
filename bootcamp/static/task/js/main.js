var getTasks, getClients, getProperties, baseUrl;

baseUrl = document.location.protocol + '//' + document.location.host + '/api';

$(document).ready(function () {

    /**
     * Generic AJAX Request Object
     */
    var requestObject = function (url, type, data, dataType) {
        return $.ajax({
            url: url,
            type: type || 'GET',
            data: data,
            dataType: dataType || '',
            beforeSend: function () {
                $('.ajax-indicator').removeClass('hidden');
            },
            complete: function () {
                $('.ajax-indicator').addClass('hidden');
            }

        });
    };

  //Get Tasks
    getTasks = function (url) {
        //Define any data to be sent along here
        var data = '', request = requestObject(url, data);
        
        request.success(function (response) {
        window.res = response;
            $.each(response.results, function displayTasks(index, task) {

                console.log(index)
                            
                var li = '<li><h2 class="title">' + task.title + '</h2>';
                li += '<div class="dates">';
                li += '<span class="start-date"><span>Start Date: </span>' + task.start_date + '</span>';
                li += '<span class="end-date"><span>End Date: </span>' + task.end_date + '</span>';
                // li += '<div class="date-closed"><span>Date Closed: </span>' + task.date_closed + '</span></div>';
                li += '<p class="description">' + task.description + '</p>';
                window[index] = [];
                
                //Get client
                getNestedJSON(baseUrl + '/clients/' + task.client + '?format=json').success(function(response) {
                    window[index]['clientDetails'] = '<div class="property-details-wrapper"><span>Client Name: </span><a href="" class="client-name" data-url="' + baseUrl + '/clients/'+ task.client + '?format=json" data-type="client">' + response.name + '</a>';
                
                    //Get property details
                    getNestedJSON(baseUrl + '/properties/' + task.property_details + '?format=json').success(function(response) {
                    
                        window.window[index]['propertyDetails'] = '<span>Property Address: </span><a href="" class="property-details" data-url="' + baseUrl + '/properties/' + task.property_details + '?format=json" data-type="property">' + response.address + '</a></div>';

                        //Assigned to
                        var user = getNestedJSON(baseUrl + '/users/' + task.assign_to + '?format=json').success(function(response){

                            window.assignedTo = '<h3 class="assign-to"><span>Assigned To: </span><a href="" data-url="' +baseUrl + '/users/' + task.assign_to + '" data-type="user">' + response.username + '</a>';
                            
                            li += window[index]['clientDetails'] + window[index]['propertyDetails'] + window.assignedTo;
                            li += '</li>';
                            $('.tasks-container').append(li);
                            
                    
                        })
                    
                    })
                });


                
                
            });
        });
        
        //Log errors to the console
        request.fail(function (jqXHR, textStatus, statusText) {
            console.log("jqXHR: ");
            console.log(jqXHR, "textStatus: " + textStatus, "statusText: " + statusText);
        });
    };
    
    
    //Get Properites
    getProperties = function (url) {
        //Define any data to be sent along here
        var data = '', request = requestObject(url, data);
        
        request.success(function (response) {
            $.each(response.results, function displayClientsList(index, property) {
                
                var li = '<li>';
                li += '<h2 class="address">' + property.address + '</h2>';

                // var client = getNestedJSON(property.client);
                // console.log(property.client)
                li += '<h3 class="client"><a href="" data-url="' + baseUrl + '/clients/' + property.client + '/?format=json" data-type="client"><span>Client Name: </span>' + 'Get Client Details' + '</a>';

                li += '<h3 class="land-ref-number"><span>Land Reference Number: </span>' + property.land_ref_number + '</h3>';
                li += '<h3 class="terms-of-reference"><span>Terms of Reference: </span>' + property.terms_of_reference + '</h3></li>';
                
                $('.properties-container').append(li);
            });
        });

        //Log errors to the console
        request.fail(function (jqXHR, textStatus, statusText) {
            console.log("jqXHR: ");
            console.log(jqXHR, "textStatus: " + textStatus, "statusText: " + statusText);
        });
    };
    
    //Get Clients
    getClients = function (url) {
        //Define any data to be sent along here
        var data = '', request = requestObject(url, data);

        request.success(function (response) {
            $.each(response.results, function displayClientsList(index, client) {
                console.log(client, response);
                
                var li = '<li><h2 class="client-name"><span>Name: </span>' + client.name + '</h2>';
                li += '<h3 class="client-email"><span> Email: </span>' + client.email + '</h3>';
                li += '<h3 class="client-phone"><span> Phone: </span>' + client.phone + '</h3></li>';
                
                $('.clients-container').append(li);
            });
        });
        
        //Log errors to the console
        request.fail(function (jqXHR, textStatus, statusText) {
            console.log("jqXHR: ");
            console.log(jqXHR, "textStatus: " + textStatus, "statusText: " + statusText);
        });

    };
    
    //Get nested JSON from URL provided
    var getNestedJSON = function (url) {
        var data = '';
        var request = requestObject(url, data, "json");
        
        return request;
    };
    
    
    //Modal 
    $('.content').on('click', 'a[data-url]', function (e) {
        e.preventDefault();
        
        //Show modal
        function createModal() {
            var modal = '<div class="modal-wrapper hidden"><div class="modal content"><h2></h2></div></div>';
            $('body').append(modal);
            $('.modal-wrapper').click(function (e) {
                $(this).addClass('hidden').children('.modal').empty();
                $('html').removeClass('no-scroll');
            });
            $('.modal').click(function (e) {
                e.stopPropagation();
            });
        }

        //Creates modal if it does not exist on page
        if (typeof $('.modal-wrapper')[0] === 'undefined' || typeof $('.modal')[0] === 'undefined') {
            createModal();
        }

        var content = '<img src="../img/ajax-loader.gif">';

        $('.modal-wrapper').removeClass('hidden');
        //Pull content
        var el = $(this);
        var url = el.attr('data-url'), request = requestObject(url);
    
        //Update Modal
        request.success(function (response) {
            var type = el.attr('data-type'), content, title;
            
            switch (type) {
                    
                case "client":
                    title = response.name;
                    // content = '<h3 class="client-email"><span>Client Email: </span>' + response.email + '</h3>';
                    content = '<h3 class="client-phone"><span>Client Phone: </span>' + response.phone + '</h3></li>';
                
                    break;

                case "property":

                    var client = response.client;
                    
                    getNestedJSON(baseUrl + '/clients/' + response.client + '?format=json').success(function(res) {
                        title = response.address;

                        content = '<h3 class="client"><span>Client Name: </span>' + res.name + '</h3>';

                        content += '<h3 class="land-ref-number"><span>Land Reference Number: </span>' + response.land_ref_number + '</h3>';
                        content += '<h3 class="terms-of-reference"><span>Terms of Reference: </span>' + response.terms_of_reference + '</h3>';
                        $('.modal').append('<h2>' + title + '</h2>').append(content);
                        return;
                        
                    });
                    return;

                    break;
                
                case "user":
                    title = response.username;
                    content = '<h3 class="client-email"><span>User Email: </span>' + response.email + '</h3>';
                    break;
                    
            }
            
            $('.modal').append('<h2>' + title + '</h2>').append(content);
                
        });
        
    });

    //Menu Icon
    $('nav .icon').click(function (e) {
        e.preventDefault();

        $('nav').toggleClass('open');

    });

});
