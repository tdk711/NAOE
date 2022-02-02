from re import S
import pandas as pd
import numpy as np

df = pd.read_csv('Offset_csv.csv', delimiter=',')
btks = np.arange(0, 3.5, 0.25)
stations = df.iloc[:,0]
s_count = 0
b_count = 1

f = open("lower.txt", "a")



for s in stations:
    
    
    if df.iloc[s_count, 15] != '-':
        b_count = 1
        output = "\nCUR   "
        output = output  + "LOWER_" + str(abs(int(s*100))) + "\nX "+ str(s) + "\nYZ     * "
        for b in btks:
            
            if b < float(df.iloc[s_count, 15])/1000:
                output = output + "(" + str(b) + "," + str(float(df.iloc[s_count, b_count])/1000) + "), "
            
            b_count+=1
        output = output + " (" +  str(float(df.iloc[s_count, 15])/1000) + "," +  str(float(df.iloc[s_count, 16])/1000) + ")"
        f.write(output)

    elif df.iloc[s_count, 15] == '-' and df.iloc[s_count, 17] != '-' :
        b_count = 1
        output = "\nCUR   "
        output = output  + "LOWER_" + str(int(s*100)) + "\nX "+ str(s) + "\nYZ     * "
        for b in btks:
            
            output = output + " (" + str(b) + "," + str(float(df.iloc[s_count, b_count])/1000) + "), " 
            
            b_count+=1
        output = output + " (" +  str(float(df.iloc[s_count, 17])/1000) + "," +  str(float(df.iloc[s_count, 18])/1000) + ")"
        f.write(output)

    elif df.iloc[s_count, 15] == '-' and df.iloc[s_count, 17] == '-' :
        b_count = 1
        output = "\nCUR   "
        output = output  + "LOWER_" + str(int(s*100)) + "\nX "+ str(s) + "\nYZ     * "
        for b in btks:
            if df.iloc[s_count, b_count] != '-':
                output = output + " (" + str(b) + "," + str(float(df.iloc[s_count, b_count])/1000) + "), " 
            
                b_count+=1

            else:
                break
        output = output + " (" +  str(float(df.iloc[s_count, 19])/1000) + "," +  str(float(df.iloc[s_count, 20])/1000) + ")"
        f.write(output)
        
    s_count+=1

f.close()