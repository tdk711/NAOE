from re import S
import pandas as pd
import numpy as np

df = pd.read_csv('Offset_csv.csv', delimiter=',')
btks = np.arange(0, 3.5, 0.25)
stations = df.iloc[:,0]
s_count = 0
b_count = 1

f = open("btks.txt", "a")



for b in btks:
    output = "\nCUR   "
    output = output  + "BTK_" + str(abs(int(b*100))) +  "\nXYZ  "
    s_count = 0
    for s in stations:
        if df.iloc[s_count, b_count] != '-':
            output = output + " (" + str(s) + ", " + str(b) + ", " +  str(float(df.iloc[s_count, b_count])/1000) + "),"
            
        s_count+=1
       

    f.write(output)
    b_count +=1

f.close()