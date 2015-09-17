/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        this.fetchItemsList();
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

    },

    addListItem: function() {
      if ($("#item").val() != "") {
        if ($("#empty-list").length) {
          $("#empty-list").remove();
        }
        this.insertNewItem($("#item").val());
        $("#item").val("")
        window.location.href = "#mainpage"
      }
    },

    insertNewItem: function(description, id) {
      if (id == undefined) {
        $.ajax({
          type: "POST",
          url: "http://localhost:3000/items.json",
          data: { description: description },
          success: function(data) {
            id = data;
            $("#item-list").find("#undefined").attr("id",id)
          },
          fail: function() {
            alert("add failed!")
          }
        });
      }
      new_item = $("<li id='"+id+"'><a href='#mainpage' class='ui-btn ui-btn-icon-right ui-icon-delete'>"+description+"</a></li>");
      new_item.click( function(e) {
        if (e.target.parentElement.id != 0 && e.target.parentElement.id != "undefined") {
          app.deleteItem(e.target.parentElement.id)
        }
        e.target.remove();
      });
      $("#item-list").append(new_item)
    },

    fetchItemsList: function() {
      items = [];
      $.ajax({
        type: "GET",
        url: "http://localhost:3000/items.json",
        success: function(data) {
          for( var i=0; i < data.length; i++) {
            app.insertNewItem(data[i].description, data[i].id);
          };
        }
      });
      return items;
    },

    deleteItem: function(id) {
      url = "http://localhost:3000/items/"+id+".json"
      $.ajax({
        type: "POST",
        url: url,
        fail: function() {
          alert("delete failed!")
        }
      });
    }
};

app.initialize();
