var hyread_urls = []; // 全域變數

      // 這是一個包含 45 個網址的陣列
      // nlpi 非標準 hyread 無法使用 ["https://ebook.nlpi.edu.tw/", "國立公共資訊圖書館"],
      var urls = [
        ["https://tpml.ebook.hyread.com.tw", "台北市立圖書館"],
        ["https://tphcc.ebook.hyread.com.tw", "新北市立圖書館"],
        ["https://klccab.ebook.hyread.com.tw", "基隆市文化局"],
        ["https://ncl.ebook.hyread.com.tw", "國家圖書館"],
        ["https://ntledu.ebook.hyread.com.tw", "國立臺灣圖書館"],
        ["https://tycccgov.ebook.hyread.com.tw", "桃園市立圖書館"],
        ["https://hcmlgov.ebook.hyread.com.tw", "新竹市圖書館"],
        ["https://hchcc.ebook.hyread.com.tw", "新竹縣公共圖書館"],
        ["https://taichunggov.ebook.hyread.com.tw", "臺中市立圖書館"],
        ["https://bocach.ebook.hyread.com.tw", "彰化縣公共圖書館"],
        ["https://chcedu.ebook.hyread.com.tw", "彰化雲端電子書庫"],
        ["https://ilccb.ebook.hyread.com.tw", "宜蘭縣政府文化局"],
        ["https://hccc.ebook.hyread.com.tw", "花蓮縣文化局"],
        ["https://cabcygov.ebook.hyread.com.tw", "嘉義市政府文化局"],
        ["https://cycabgov.ebook.hyread.com.tw", "嘉義縣公共圖書館"],
        ["https://nthccgov.ebook.hyread.com.tw", "南投縣公共圖書館"],
        ["https://pthggov.ebook.hyread.com.tw", "屏東縣公共圖書館"],
        ["https://cclttct.ebook.hyread.com.tw", "臺東縣政府文化處"],
        ["https://phhcc.ebook.hyread.com.tw", "澎湖縣圖書館"],
        ["https://miaolilib.ebook.hyread.com.tw", "苗栗縣立圖書館"],
        ["https://mlcg.ebook.hyread.com.tw", "苗栗市立圖書館"],
        ["https://sanwan.ebook.hyread.com.tw", "苗栗縣三灣鄉立圖書館"],
        ["https://dahu.ebook.hyread.com.tw", "苗栗縣大湖鄉立圖書館"],
        ["https://gungguan.ebook.hyread.com.tw", "苗栗縣公館鄉立圖書館"],
        ["https://xihu.ebook.hyread.com.tw", "苗栗縣西湖鄉立圖書館"],
        ["https://nanchuang.ebook.hyread.com.tw", "苗栗縣南庄鄉立圖書館"],
        ["https://houlong.ebook.hyread.com.tw", "苗栗縣後龍鎮立圖書館"],
        ["https://yuanli.ebook.hyread.com.tw", "苗栗縣苑裡鎮立圖書館"],
        ["https://tungshiau.ebook.hyread.com.tw", "苗栗縣通霄鎮立圖書館"],
        ["https://zaociao.ebook.hyread.com.tw", "苗栗縣造橋鄉立圖書館"],
        ["https://stan.ebook.hyread.com.tw", "苗栗縣獅潭鄉圖書館"],
        ["https://toufenlib.ebook.hyread.com.tw", "苗栗縣頭份市立圖書館"],
        ["https://touwu.ebook.hyread.com.tw", "苗栗縣頭屋鄉立圖書館"],
        ["https://ncltrccs.ebook.hyread.com.tw", "國家圖書館臺灣漢學資源中心暨臺灣學術數位資源中心電子書平台"],
        ["https://ylccb.ebook.hyread.com.tw", "雲林縣公共圖書館"],
        ["https://hsinrong.ebook.hyread.com.tw", "欣榮紀念圖書館"],
        ["https://jianlib.ebook.hyread.com.tw", "花蓮縣吉安鄉立圖書館"],
        ["https://hualienlib.ebook.hyread.com.tw", "花蓮縣花蓮市立圖書館"],
        ["https://shlinlib.ebook.hyread.com.tw", "秀林鄉立圖書館"],
        ["https://sinchenlib.ebook.hyread.com.tw", "新城鄉立圖書館"],
        ["https://tnml.ebook.hyread.com.tw", "臺南市立圖書館"],
        ["https://ksml.ebook.hyread.com.tw", "高雄市立圖書館"],
        ["https://kinmen.ebook.hyread.com.tw", "金門縣文化局"],
        ["https://lieyu.ebook.hyread.com.tw", "金門縣烈嶼鄉公所"],
        ["https://matsucc.ebook.hyread.com.tw", "連江縣公共圖書館"],
      ];