    $(document).ready(function () {
      $("#search-button").click(function () {
        // 在發送請求之前，清空 id 為 results 的 div 元素的內容
        $("#results").empty();
        var book_name = $("#book-name").val();
        var bookNameUrl = "https://ebook.hyread.com.tw/searchList.jsp?search_field=FullText&search_input=" + book_name;
        $.ajax({
          url: bookNameUrl,
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
          },
          timeout: 10000,
          success: function (data) {
            var soup = $(data);
            var book_titles = soup.find('div.book-title-01');
            var book_dict = {};
            for (var i = 0; i < book_titles.length; i++) {
              var book_url = book_titles.eq(i).find('a');
              var book_id = book_url.attr('href').match(/id=(\d+)/)[1];
              book_dict[i] = book_url.text();
              // 將 value 改為 book_dict[i] //書名
              // 將 data-id 屬性設為 book_url.attr('href') // id
              var html_text = '<div><input type="text" value="' + book_dict[i] + '" id="clipborad-text-' + i + '" data-id="' + book_url.attr('href') + '"><button onclick="copyToClipboard(' + i + ')">找這本</button></div>';

              $("#results").append(html_text);   //書名
            }
          },
          error: function (error) {
            $("#results").html('<label>連線錯誤: ' + error + '</label>');
          }

        });
      });
    });

    function copyToClipboard(i) {
      // 獲取指定元素的 data-id 屬性，而不是 value 屬性
      var copyText = document.getElementById("clipborad-text-" + i).dataset.id;
      // 將書籍ID寫到剪貼簿
      // navigator.clipboard.writeText(copyText);
      // alert("Copied the link: " + copyText);

      // 調用 searchBook(copyText) 函數
      searchBook(copyText);
    }


    function searchBook(bookID) {
      var headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      };
      var book2ID = bookID;
      const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

      var promises = window.hyread_urls.map(async url => {
        await delay(200); // 等待 200 毫秒
        console.log("window.hyread_urls " + window.hyread_urls);
        var api = url + "/" + book2ID;
        console.log("api: " + api);

        // Declare the response_text variable outside of the fetch() request
        var response_text;

        // Fetch the book details
        return fetch(api, {headers: headers})
          .then(response => {
            // Assign the value of the response.text() promise to the response_text variable
            response_text = response.text();
            return response_text;
          })
          .then(response_text => {
            var soup = new DOMParser().parseFromString(response_text, "text/html");

            // Check for the presence of the image with the class "nosale2_pic.png"
            if (soup.querySelector('img[src="/Template/RWD3.0/images/nosale2_pic.png"]')) {
              console.log("本館無此書");
              return;
            }
            else {
              var book_title = soup.querySelector('h3');
              console.log("book_title:", book_title);
              var book_hits = soup.querySelector('.date');
              console.log("book_hits:", book_hits);
              var my_state_button = soup.querySelector('#myStateButton').textContent.trim();
              console.log("Library name:", my_state_button);
              var collection = soup.querySelector('#Collection');
              var collection2 = soup.querySelector('#combineSite0');
              //根據您的程式碼，我發現您在第99行可能沒有考慮到一種情況，就是當soup.querySelector(‘#Collection’)找不到任何元素時，它會回傳null，而不是一個空的物件。這樣的話，您就不能直接使用.textContent屬性，而是要先判斷是否為null。您可以使用以下的寫法來避免這個錯誤：
              if (collection != null) {collection = collection.textContent;}
              console.log("Status:", collection);


              // 以下是根據Python程式碼轉換的JavaScript程式碼
              // 如果my_state_button包含"計次服務"，就進行爬取
              if (my_state_button.includes("計次服務")) {
                // 使用querySelector方法來查找meta標籤，並指定property屬性為"og:title"
                var meta_tag = soup.querySelector("meta[property='og:title']");
                console.log("meta_tag:", meta_tag);
                // 使用getAttribute方法來取得meta標籤的content屬性
                var freeLibName = meta_tag.getAttribute("content");
                console.log("freeLibName:", freeLibName);
                // 如果freeLibName不是null，才進行分割
                if (freeLibName != null) {
                  // 使用split方法來將freeLibName按照空格分割成一個陣列
                  var freeLibName_list = freeLibName.split(" ");
                  // 從陣列中選擇最後一個元素，也就是圖書館名稱
                  var library_name = freeLibName_list[freeLibName_list.length - 1];
                  console.log("館別2: " + library_name)
                  output = "館別2: " + my_state_button + "-" + library_name + " >>> [人氣" + book_hits.textContent + "]<br>";
                  output += "書名: " + "<a href=\"" + api + "\">" + book_title.textContent + "</a><br>";
                  return output;
                }
                else {
                  // 將館別1的輸出放在else語句的內部
                  output = "館別1: " + my_state_button + "-" + api + "<br>";
                  console.log("館別1: " + my_state_button + "----" + api);
                  return output;
                }
              }

              var output = "館別3: " + my_state_button + " >>> [人氣" + book_hits.textContent + "]<br>";
              output += "書名: " + "<a href=\"" + api + "\">" + book_title.textContent + "</a><br>";
              if (collection != null) {
                output += "狀態: " + collection + "<br>";
              } else {
                output += "狀態: " + collection2.textContent + "<br>";
                console.log("另一個圖書館:", collection2.textContent);
              }
              return output;
            }
          })
          .catch(error => {
            console.error(error);
          });
      });

      Promise.all(promises)
        .then(results => {
          // 使用 filter 方法過濾掉 undefined 的值
          var valid_results = results.filter(result => result != undefined);
          // 判斷結果陣列是否為空
          if (valid_results.length == 0) {
            // 提示使用者查無此書
            document.getElementById("findbook").innerHTML = "查無此書";
          } else {
            // 將有效的結果連接成一個字串
            var output = valid_results.join("<br>");
            document.getElementById("findbook").innerHTML = output;
          }
        })
        .catch(error => {
          console.error(error);
        });

    }
