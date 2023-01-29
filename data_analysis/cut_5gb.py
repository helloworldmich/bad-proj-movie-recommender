# cut 5gb data into each json file w/ many json{}, not []
print("Started Reading JSON file which contains multiple JSON document")

lis = []
counter = 0

with open('../data_src/Movies_and_TV.json', 'r') as f:
    for jsonObject in f:
        lis.append(jsonObject)
        if len(lis) % 80000 == 0:
            with open(f'./split_review_{counter:03}.json', 'w') as write_file:
                for item in lis:
                    write_file.write(item)
            counter += 1
            lis = []
        if counter == 8765568:
            with open(f'./split_review_final.json', 'w') as write_file:
                for item in lis:
                    write_file.write(item)
            counter += 1
            lis = []
# #####################################################
