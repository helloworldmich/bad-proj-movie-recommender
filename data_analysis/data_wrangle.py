import json
import pandas as pd

# metaList = []
print("Started Reading JSON file which contains multiple JSON document")
# with open('../data_src/meta_Movies_and_TV.json') as f:
#     for jsonObj in f:
#         metaDict = json.loads(jsonObj)
#         metaList.append(metaDict)

# print("Printing each JSON Decoded Object")
# print(metaList[1])

# df_meta = pd.DataFrame(metaList)
# print(df_meta)
# df_meta.to_csv (r'../data_src/meta_Movies_and_TV.csv', index = False)
# f.close()

itemList = []
count = 0

with open('../data_src/Movies_and_TV.json') as f:
    for jsonObj in f:
        count += 1
        itemDict = json.loads(jsonObj)
        itemList.append(itemDict)
        # print(itemDict)
        if count % 80000 == 0:
            df = pd.DataFrame(itemList)
            df.to_csv(f'Movies_and_TV_{count/80000}.json', index=False)
            itemList = []
        # if count == 500:
        #     break
        if count == 8765568:
            df = pd.DataFrame(itemList)
            df.to_csv(f'Movies_and_TV_final.json', index=False)
            itemList = []

# print("Printing each JSON Decoded Object")
# print(itemList[0])
# df_index = pd.DataFrame(itemList)
# print(df_index.info())
# f.close()


# df_index.to_csv (r'test_Movies_and_TV.csv', index = False)
