import json
import pandas as pd
df = pd.read_csv('../data_src/Movies_and_TV.csv')
# print(df.info)
# print(df['reviewerID'].mode())


input_csv = '../data_src/Movies_and_TV.csv'

number_lines = sum(1 for row in (open(input_csv)))

rowsize = 80000
# start looping through data writing it to a new file for each set

for i in range(1, number_lines, rowsize):
    df = pd.read_csv(input_csv,
                     header=0,
                     nrows=rowsize,  # number of rows to read at each loop
                     skiprows=i,  # skip rows that have been read
                     )


# csv to write data to a new file with indexed name. input_1.csv etc.
    output_csv = 'input' + str(i) + '.csv'

df.to_csv(output_csv,
          index=False,
          header=True,
          mode='a',  # append data to csv file
          chunksize=rowsize,
          )  # size of data to append for each loop

# add: low_memory=False


# method 1 
# csvfile = open('../data_src/Movies_and_TV.csv', 'r').readlines()
# filename = 1
# for i in range(len(csvfile)):
#    if i % 100000 == 0:
#         open(str(filename) + '.csv', 'w+').writelines(csvfile[i:i+80000])
#         filename += 1
