import requests
import re
from bs4 import BeautifulSoup
import threading # 引入threading模組
# 導入 ipywidgets 模組
import ipywidgets as widgets
import functools # 匯入 functools 模組
# 匯入 os 模組
import os


book_name = input("請輸入查找書名： ")

bookNameUrl = "https://ebook.hyread.com.tw/searchList.jsp?search_field=FullText&search_input=" + book_name

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
}

# 建立一個執行緒的列表，用來儲存所有的執行緒物件
threads = []
# 使用 len 函數來獲得列表的長度
length = len(threads)
# 使用 if 陳述式來判斷列表是否為空
if length == 0:
    # 顯示一個訊息
    print("搜尋完成")


# 設定每次啟動的執行緒的數量
thread_num = 7

# 建立一個全域的鎖物件
lock = threading.Lock()

# 直接將網址儲存為列表
hyread_urls = [
    "https://klccab.ebook.hyread.com.tw",
    "https://taichunggov.ebook.hyread.com.tw",
    "https://ncl.ebook.hyread.com.tw",
    "https://tycccgov.ebook.hyread.com.tw",
    "https://hcmlgov.ebook.hyread.com.tw",
    "https://hchcc.ebook.hyread.com.tw",
    "https://miaolilib.ebook.hyread.com.tw",
    "https://cabcygov.ebook.hyread.com.tw",
    "https://tnml.ebook.hyread.com.tw",
    "https://cclttct.ebook.hyread.com.tw",
    "https://matsucc.ebook.hyread.com.tw",
    "https://phhcc.ebook.hyread.com.tw",
    "https://shlinlib.ebook.hyread.com.tw",
    "https://ilccb.ebook.hyread.com.tw",
    "https://hsinrong.ebook.hyread.com.tw",
    "https://hccc.ebook.hyread.com.tw",
    "https://jianlib.ebook.hyread.com.tw",
    "https://hualienlib.ebook.hyread.com.tw",
    "https://kinmen.ebook.hyread.com.tw",
    "https://mlcg.ebook.hyread.com.tw",
    "https://sanwan.ebook.hyread.com.tw",
    "https://dahu.ebook.hyread.com.tw",
    "https://gungguan.ebook.hyread.com.tw",
    "https://xihu.ebook.hyread.com.tw",
    "https://nanchuang.ebook.hyread.com.tw",
    "https://houlong.ebook.hyread.com.tw",
    "https://yuanli.ebook.hyread.com.tw",
    "https://tungshiau.ebook.hyread.com.tw",
    "https://zaociao.ebook.hyread.com.tw",
    "https://stan.ebook.hyread.com.tw",
    "https://toufenlib.ebook.hyread.com.tw",
    "https://ksml.ebook.hyread.com.tw",
    "https://sinchenlib.ebook.hyread.com.tw",
    "https://chcedu.ebook.hyread.com.tw",
    "https://tpml.ebook.hyread.com.tw",
    "https://tphcc.ebook.hyread.com.tw",
    "https://ntledu.ebook.hyread.com.tw",
    "https://lieyu.ebook.hyread.com.tw",
    "https://ylccb.ebook.hyread.com.tw",
    "https://bocach.ebook.hyread.com.tw",
    "https://pthggov.ebook.hyread.com.tw",
    "https://cycabgov.ebook.hyread.com.tw",
    "https://touwu.ebook.hyread.com.tw",
    "https://ncltrccs.ebook.hyread.com.tw",
    "https://nthccgov.ebook.hyread.com.tw",
]

try:
    hyreadBooks = requests.get(bookNameUrl, headers=headers, timeout=10)
except requests.exceptions.RequestException as e:
    print("連線錯誤: ", e)
    exit()

hyreadbooks_text = hyreadBooks.text

soup1 = BeautifulSoup(hyreadbooks_text, 'html.parser')

bookID =""

#建立一個透過書籍ID觸發尋找的功能
#不知為何這裡傳遞來的資訊 book_url 變成book2ID 應該要傳遞的，book2ID變成 = "Button(description='找這本', style=ButtonStyle())"
def search_book(book_url, book2ID):
  # 清空輸出
  os.system('cls') # 如果您使用的是 Windows 系統，請使用這一行
  # os.system('clear') # 如果您使用的是 Linux 或 Mac 系統，請使用這一行
  bookID = book_url

  # 使用一個for迴圈，每次從hyread_urls中取出thread_num個網址，並為每個網址建立一個執行緒物件，將該物件加入到執行緒的列表中，並啟動該執行緒
  for i in range(0, len(hyread_urls), thread_num):
      for url in hyread_urls[i:i+thread_num]:
          thread = threading.Thread(target=handle_url, args=(url,bookID))
          threads.append(thread)
          thread.start()

  # 使用一個while迴圈，不斷地檢查執行緒的列表，並在執行緒結束時立即移除
  while threads:
      for thread in threads:
          if not thread.is_alive():
              threads.remove(thread)

try:
    book_titles = soup1.find_all('div', class_='book-title-01' ) # 獲得所有符合的書籍元素
    book_dict = {} # 建立一個字典，用來儲存書籍編號和書名的對應關係
    # 建立一個空的垂直盒子，用來放置元件
    box = widgets.VBox()
    for i, book_title in enumerate(book_titles, 1): # 遍歷每個元素，並生成編號
        book_url = book_title.find('a')
        book2ID = re.search('id=(\d+)', book_url['href']).group(1)
        book_dict[i] = book_url.text # 將書籍編號和書名加入字典中
        # 建立一個標籤，並且顯示書名
        #label = widgets.Label(value=book_title.find('a').text)
        # 建立一個標籤，並且顯示書籍編號和書名
        #label = widgets.Label(value=f"{i}. {book_title.find('a').text}")
        # 或者
        label = widgets.Label(value="{}. {}".format(i, book_title.find('a').text))
        # 建立一個按鈕，並且指定 on_click 事件為 searchBook 函式，傳入 book2ID 參數
        button = widgets.Button(description="找這本")
        # 使用 functools.partial 函數來固定參數的值
        button.on_click(functools.partial(search_book,book2ID)) # 使用 functools.partial 函數並固定參數的值
        # 建立一個水平盒子，用來放置標籤和按鈕
        hbox = widgets.HBox([ label, button])
        # 將水平盒子加入垂直盒子中
        box.children += (hbox,)

    # 顯示垂直盒子
    display(box)

except AttributeError as e:
    print("找沒這本書喔: ", e)
    exit()


# 定義一個函數，用來處理每個網址的請求和輸出
def handle_url(url,book2ID):

    # 使用 format 方法來連接字串，而不是使用加號
    api = "{}/bookDetail.jsp?id={}".format(url, book2ID)
    #print(f"Searching for book with ID: {book2ID}")
    #    #print("\n連結1： " + api)
    #else:
    #    api = ""
    #    print("\n連結2： " + api)

    try:
        response = requests.get(api, headers=headers, timeout=10)
    except requests.exceptions.RequestException as e:
        print("連線錯誤: ", e)
        return

    response_text = response.text
    # 檢查 response_text 中是否有 "/Template/RWD3.0/images/nosale2_pic.png" 這個字串
    ## 這個檢查避免了[有書ID但Hyread查不到書的錯誤]
    if "/Template/RWD3.0/images/nosale2_pic.png" in response_text:
        # 如果有，則直接返回，不做任何處理
        #print("本館無此書!")
        return
    # 使用 try-except 陳述式來捕捉可能的異常
    try:
        # 使用 BeautifulSoup 函數來解析 response_text，並指定解析器為 'html.parser'
        soup = BeautifulSoup(response_text, 'html.parser')
        # 使用 find 函數來尋找第一個 'h3' 標籤，並將它賦值給 book_title 變數
        book_title = soup.find('h3')
        # 使用 find 函數來尋找第一個 'span' 標籤，並且使用 string 參數來指定要匹配的文字，使用 re.compile 函數來建立一個正規表示式，匹配包含 '點閱' 的文字，並將它賦值給 book_hits 變數
        book_hits = soup.find('span', string=re.compile('點閱'))
        # 在這裡寫上您的邏輯，使用 book_title 和 book_hits 變數
    except ParserError as e: # 如果發生 ParserError 異常，則執行以下的程式碼
        # 使用 print 函數來印出錯誤訊息
        print("解析錯誤: ", e)
        # 返回 None 值，表示函數沒有成功執行
        return None

    # 在寫入終端機之前，請求鎖
    lock.acquire()
    print("書名: " + book_title.string + "-----人氣" + book_hits.string)

    my_state_button = soup.find(id="myStateButton")
    # 如果my_state_button.text包含"計次服務"，就進行爬取
    if "計次服務" in my_state_button.text:
        # 使用BeautifulSoup的select方法來根據CSS選擇器來查找元素
        # 您可以根據不同的網頁結構，選擇合適的選擇器，例如：img[title]、#navbar img、#navbar *[title]等
        img_tag_list = soup.select("img[title]")
        # 如果img_tag_list不是空列表，就從中選擇一個img元素
        if img_tag_list:
            # 這裡假設您想要的img元素是第一個，您可以根據實際情況修改
            img_tag = img_tag_list[0]
            # 使用get方法來取得img元素的title屬性
            freeLibName = img_tag.get("title")
            # 如果freeLibName不是None，才進行連接
            if freeLibName is not None:
                print("館別2: " + freeLibName +"-"+ api)
    else:
        # 將館別1的輸出放在else語句的內部
        print("館別1: " + my_state_button.text +"----"+ api)


    collection = soup.find('div', id="cntSite")
    if collection is None:
        collection = soup.find('div', id="Collection")
        if collection is None:
            collection = soup.find('div', id="combineSite0")
    print("狀態: " + collection.text + " \n")
    # 在寫入終端機之後，釋放鎖
    lock.release()
