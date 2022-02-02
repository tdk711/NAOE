from re import S
import pandas as pd
import numpy as np

df = pd.read_csv('Offset_csv.csv', delimiter=',')

stations = df.iloc[:,0]
s_count = 0


f = open("uc.txt", "a")


output = "\nCUR   "
output = output  + "UPPER_CHINE" + "\nXYZ  "
for s in stations:
    
    if df.iloc[s_count, 17] != '-':
       
        output = output + " (" + str(s) + ", " + str(float(df.iloc[s_count, 17])/1000) + ", " +  str(float(df.iloc[s_count, 18])/1000) + "),"
        

    
    s_count+=1
 
f.write(output)
f.close()

