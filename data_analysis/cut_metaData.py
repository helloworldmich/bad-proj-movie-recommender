# cut metaData file into json []
import json
import pandas as pd

print("Started Reading JSON file which contains multiple JSON document")

metaList = []
count = 0

with open('../data_src/Movies_and_TV.json') as f:
    for jsonObj in f:
        count += 1
        metaDict = json.loads(jsonObj)
        metaList.append(metaDict)
        # print(metaList)
        if count % 80000 == 0:
            df = pd.DataFrame(metaList)
            df.to_json(
                f'Movies_and_TV{count/80000}.json', orient="records")
            # records
            # df.to_csv(f'meta_Movies_and_TV{count/20000}.csv', index=False")

            metaList = []
        # if count == 500:
        #     break
        if count == 8765568:
            df = pd.DataFrame(metaList)
            df.to_json(f'Movies_and_TV_final.json', orient="records")
            metaList = []

# total: 203970 records

# for reading file info:
#         metaList = json.loads(jsonObj)
#         metaList.append(metaList)

# df_index = pd.DataFrame(metaList)
# print(df_index.info())
# f.close()
