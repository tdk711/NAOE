#include <iostream>
#include <fstream>
#include <cmath>

using namespace std;

int main(){

    // Declare Variables
    double T_k[101][101], T_k1[101][101], Q[101][101], sum, e, delta;
    const int m = 101;
    const double error = 0.0001;
    int coi;

    //Initialising Variables:
    for (int i = 0;  i < m; i++)
    {
        for (int j = 0; j < m; j++){
            T_k[i][j] = 0;
            Q[i][j] = 0;
        }

    }
    e = 0.00;
    delta = 0.00;
    sum = 0.00;
    coi = 0;

    // Magnitude of Discrete Step:
    delta = 10.0/static_cast<double>(m-1);
    cout<<"Step Size: "<<delta<<endl;

    // Boundary Conditions:
    for(int i = 0; i < m; i++){

        T_k[0][i] = 0.0;
        T_k1[0][i] = 0.0;

        T_k[m-1][i] = 0.0;
        T_k1[m-1][i] = 0.0;

        T_k[i][0] = 40.0;
        T_k1[i][0] = 40.0;

        T_k[i][m-1] = 40.0;
        T_k1[i][m-1] = 40.0;

    }

    //T_k[0][10] = 40.0;
    //T_k1[0][10] = 40.0;

    // Sources and Sinks:
    Q[(2*(m-1))/5][(m-1)/2] = -1.00;
    Q[(4*(m-1))/5][(m-1)/5] = 1.00;

    // Iterations + Error Checking:
    do
    {
        coi++;

        for (int i = 0;  i < m; i++)
        {
            for (int j = 0; j < m; j++){

                T_k[i][j] = T_k1[i][j];
            
            }

        }
        // Jacobi Iteration:
        for (int i = 1;  i < m-1; i++)
        {
            for (int j = 1; j < m-1; j++){

                T_k1[i][j] = (0.25)*(T_k[i+1][j] + T_k[i-1][j] + T_k[i][j+1] + T_k[i][j-1] - Q[i][j]*(delta*delta));
            
            }

        }

        // Error:
        for (int i = 1;  i < m-1; i++)
        {
            for (int j = 1; j < m-1; j++){

                sum = pow((T_k1[i][j] - T_k[i][j]),2);

            }

        }

        e = sqrt(sum);
        
    } while (e > error);

    cout<<"Number of Iterations: "<<coi;
    
    // Writing Output to File:
    ofstream oStream;
    oStream.open("output_1.txt");

    for (int i = m-1;  i >= 0; i--)
    {
        for (int j = 0; j < m; j++){
            oStream << T_k1[j][i] << " ";
        }

        oStream << endl;
    }
    
    oStream.close();
    return 0;
}