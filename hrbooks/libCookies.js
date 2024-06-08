      // 這是一個用來取得 container 元素的變數
      var container = document.getElementById("container");

      // 這是一個用來取得全選 checkbox 的變數
      var selectAll = document.getElementById("select-all");

      // 這是一個用來生成 47 個 checkbox 的函數
      function createCheckboxes() {
        // 使用 forEach 迴圈來遍歷 urls 陣列
        urls.forEach(function (url, index) {
          // 生成 id，用 01～47 來命名
          var id = "url-" + (index + 1).toString().padStart(2, "0");
          // 創建一個 label 元素
          var label = document.createElement("label");
          label.setAttribute("for", id);
          // 創建一個 input 元素，類型為 checkbox
          var checkbox = document.createElement("input");
          checkbox.type = "checkbox";
          checkbox.name = "url";
          // 將 value 改為 url 陣列中的第二個元素，即圖書館名稱
          checkbox.value = url[0];
          checkbox.id = id;
          // 將 checkbox 放入 label 中
          label.appendChild(checkbox);
          // 創建一個文字節點，用 id 作為內容
          label.appendChild(document.createTextNode(url[1]));
          // 將 label 加入 container 中
          container.appendChild(label);
          // 加入一個換行符號
          container.appendChild(document.createElement("br"));
        });
      }

      // 這是一個用來更新 hyread_urls 陣列的函數
      function updateHyreadUrls() {
        // 清空 hyread_urls 陣列
        hyread_urls = [];
        // 取得所有名稱為 url 的 checkbox
        var checkboxes = document.getElementsByName("url");
        // 使用 forEach 迴圈來遍歷 checkbox
        checkboxes.forEach(function (checkbox) {
          // 如果 checkbox 被勾選，就將其值加入 hyread_urls 陣列
          if (checkbox.checked) {
            hyread_urls.push(checkbox.value);
          }
        });
        // 在控制台中顯示 hyread_urls 陣列
        console.log(hyread_urls);
      }

      // 這是一個用來處理全選 checkbox 的變化的函數
      function handleSelectAllChange() {
        // 取得所有名稱為 url 的 checkbox
        var checkboxes = document.getElementsByName("url");
        // 使用 forEach 迴圈來遍歷 checkbox
        checkboxes.forEach(function (checkbox) {
          // 如果全選 checkbox 被勾選，就將所有 checkbox 都勾選
          // 否則，就將所有 checkbox 都取消勾選
          checkbox.checked = selectAll.checked;
        });
        // 更新 hyread_urls 陣列
        updateHyreadUrls();
      }

      // 這是一個用來處理其他 checkbox 的變化的函數
      function handleCheckboxChange() {
        // 取得所有名稱為 url 的 checkbox
        // 使用不同的名稱來區分全選的 checkbox 和其他的 checkbox
        var allCheckboxes = document.getElementsByName("url");
        // 使用 filter 方法來篩選出被勾選的 checkbox
        var checked = Array.from(allCheckboxes).filter(function (checkbox) {
          return checkbox.checked;
        });
        // 如果被勾選的 checkbox 的數量等於 47，就將全選 checkbox 勾選
        // 否則，就將全選 checkbox 取消勾選
        selectAll.checked = checked.length === 47;
        // 更新 hyread_urls 陣列
        updateHyreadUrls();
      }

      // 呼叫 createCheckboxes 函數來生成 47 個 checkbox
      createCheckboxes();

      // 為全選 checkbox 添加 change 事件監聽器，並綁定 handleSelectAllChange 函數
      selectAll.addEventListener("change", handleSelectAllChange);

      // 為其他 checkbox 添加 change 事件監聽器，並綁定 handleCheckboxChange 函數
      // 使用不同的名稱來區分全選的 checkbox 和其他的 checkbox
      var selectedCheckboxes = document.getElementsByName("url");
      selectedCheckboxes.forEach(function (checkbox) {
        checkbox.addEventListener("change", handleCheckboxChange);
      });

      // 為每個 checkbox 加上事件監聽器
      for (var i = 0; i < selectedCheckboxes.length; i++) {
        selectedCheckboxes[i].addEventListener("change", function () {

          // 當 checkbox 狀態改變時，設定一個名為 checkbox-id 的 cookie，值為 checkbox 的 checked 的狀態，例如 "checkbox-url-01=true"
          document.cookie = "checkbox-" + this.id + "=" + this.checked;

        });
      }

      // 當網頁載入時，讀取 cookie 並還原 checkbox 的狀態
      window.onload = function () {
        // 取得所有的 cookie
        var cookies = document.cookie.split("; ");
        // 遍歷每個 cookie
        for (var i = 0; i < cookies.length; i++) {
          // 分割 cookie 的名稱、值和狀態，例如 ["checkbox-url-01", "true"]
          var cookie = cookies[i].split("=");
          // 如果 cookie 的名稱是以 checkbox- 開頭，則找到對應的元素，並設定 checked 的狀態
          // 使用 startsWith 方法來判斷字串是否以指定的字元開頭
          if (cookie[0].startsWith("checkbox-")) {
            // 用 slice 方法來去掉 "checkbox-" 的部分，只保留 id
            var element = document.getElementById(cookie[0].slice(9));
            element.checked = cookie[1] == "true";
          }
        }
      };