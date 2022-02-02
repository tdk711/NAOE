from re import S
import pandas as pd
import numpy as np

df = pd.read_csv('Offset_csv.csv', delimiter=',')

stations = df.iloc[:,0]
s_count = 0


f = open("upper.txt", "a")



for s in stations:
    
    if df.iloc[s_count, 17] != '-':
        output = "\nCUR   "
        output = output  + "UPPER_" + str(abs(int(s*100))) + "\nX "+ str(s) + "\nYZ     * "
        output = output + " (" +  str(float(df.iloc[s_count, 17])/1000) + "," +  str(float(df.iloc[s_count, 18])/1000) + "),"
        output = output + " (" +  str(float(df.iloc[s_count, 19])/1000) + "," +  str(float(df.iloc[s_count, 20])/1000) + ")"
        f.write(output)

    
    s_count+=1

f.close()