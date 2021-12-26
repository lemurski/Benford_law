
def head(file):
    
    
    with open(file,'r') as data:
        line = data.readline()
        while line == '\n':
            line = data.readline()

    sniffer = csv.Sniffer()
    dialect = sniffer.sniff(line)

    df = pd.read_table(file,sep=dialect.delimiter)
    
    lst = []

    for col in df.columns:
        lst.append(col)

    lst = json.dumps(lst)

    return lst


def main(file,column):
    import pandas as pd
    import csv

    with open(file,'r') as data:
        line = data.readline()
        while line == '\n':
            line = data.readline()

    sniffer = csv.Sniffer()
    dialect = sniffer.sniff(line)

    df = pd.read_table(file,sep=dialect.delimiter)

    mask = df[column]>1
    data = list(df[mask][column])
    nums=[1,2,3,4,5,6,7,8,9]
    
    for i in range(len(data)):
        while data[i]>10:
            data[i]=data[i]/10
    
 
    first_digits=[int(x) for x in sorted(data)]
    
    num_count = []

    for i in nums:
        count = first_digits.count(i)
        num_count.append(count)

    total= sum(num_count)

    data_percentage = [(i/total)*100 for i in num_count ]


    return data_percentage


    
