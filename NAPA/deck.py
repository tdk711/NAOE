from re import S
import pandas as pd
import numpy as np

df = pd.read_csv('Offset_csv.csv', delimiter=',')

stations = df.iloc[:,0]
s_count = 0


f = open("deck.txt", "a")


output = "\nCUR   "
output = output  + "SIDE_DECK" + "\nXYZ  "
for s in stations:
    
    if s > 9.35:
       
        output = output + " (" + str(s) + ", " + str(float(df.iloc[s_count, 19])/1000) + ", " +  str(float(df.iloc[s_count, 20])/1000) + "),"
        

    
    s_count+=1
output = output + " (18.7, 0, 3.4)"   
f.write(output)
f.close()

