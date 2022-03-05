"""
Group 2 
"""

import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
import numpy as np
import pandas as pd
import sys
print('test')

tf = TfidfVectorizer(analyzer='word',ngram_range=(1, 2),min_df=0, stop_words='english') #transforms text to feature vectors that can be used as input to estimator.
exercises  = pd.read_csv('exercises.csv')
exercises = exercises.dropna()
exercises["Name"] = exercises["Name"].str.lower() #standardize names 

#print(exercises)
tfidf_matrix = tf.fit_transform(exercises['General Target Area']) #gets if-idf values 
cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix) #calculate a numeric quantity that denotes the similarity between two movies. Higher the cosine value, the more similar the terms are

#get value for  exercise category
tfidf_matrix2 = tf.fit_transform(exercises['Exercise Category'])
cosine_sim2 = linear_kernel(tfidf_matrix2, tfidf_matrix2)

#get values for average of general target area and exercise category similarity
cosine_sim3 = (cosine_sim + cosine_sim2) / 2


titles = exercises['Name']
indices = pd.Series(exercises.index, index = exercises['Name'])
#print(indices)


#function that determines similarity between difficulties
def convert_difficulty(aList):
    return_list = []
    #print(aList)
    for x in aList:
        element_list = []
        #print(element_list)
        for y in aList:
            #print(x,y)
            if x == 'Beginner' and y == 'Beginner':
                #print('same value, beginner')
                element_list.append(1.0)
            elif x == 'Intermediate' and y == 'Intermediate':
                #print('same value, inter')
                element_list.append(1.0)
            elif x == 'Advanced' and y == 'Advanced':
                #print('same value, advanced')
                element_list.append(1.0)
            elif x == 'Beginner' and y == 'Intermediate':
                #print('different value')
                element_list.append(0.5)
            elif x == 'Beginner' and y == 'Advanced':
                #print('different value')
                element_list.append(0.25)
            elif x == 'Intermediate' and y == 'Beginner':
                #print('different value')
                element_list.append(0.5)
            elif x == 'Intermediate' and y == 'Advanced':#pontentially a problem
                #print('different value')
                element_list.append(0.5)
            elif x == 'Advanced' and y == 'Intermediate':
                #print('different value')
                element_list.append(0.5)
            elif x == 'Advanced' and y == 'Beginner':
                #print('different value')
                element_list.append(0.25)
        #print(element_list)
        return_list.append(element_list)
    return return_list

theList = exercises['Difficulty'].tolist()
#print(theList)
list2 = []
for x in theList:
    #print(x[:-1])
    if(x[-1].isspace()):
        list2.append(x[:-1])
    else:
        list2.append(x)
#print(list2)

cosine_sim4 = convert_difficulty(list2)



# Function that get movie recommendations based on the cosine similarity score of movie genres
def target_recommendations(title,sim):
    idx = indices[title]
    sim_scores = list(enumerate(sim[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[1:21]
    movie_indices = [i[0] for i in sim_scores]
    return titles.iloc[movie_indices]


set_exercises = ['Cable Pull Through','Kettle Bell Swings','Pull-ups']
def give_set_recommendations(title,sim):
    arr2 = []
    idx = indices[title]
    sim_scores = list(enumerate(sim[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[1:21]
    movie_indices = [i[0] for i in sim_scores]
    names2 =  titles.iloc[movie_indices]
    '''
    print(type(names2))
    print('names',names2)
    names2 = names2.reset_index()
    print('names',names2)
    '''
    count = 0
    for x in names2:
        print(x)
        if x in set_exercises or x in arr2:
            print('exericse already in template')
        else:
            print('exericse pushed into array')
            arr2.append(x)
        
    return arr2[:3]+ set_exercises

#print(target_recommendations('Deadlift'))
exercise_name = sys.argv[2].lower() #standardize exercise name
print('Hello  ',sys.argv[1],'. These are the exercises similar to ', exercise_name, ":") 

#print(target_recommendations(exercise_name))
outputs = target_recommendations(exercise_name,cosine_sim)
for x in outputs:
    print(x,",")
print('-------------------')
outputs = target_recommendations(exercise_name,cosine_sim2)
for x in outputs:
    print(x,",")
print('-------------------')

outputs = target_recommendations(exercise_name,cosine_sim3)
for x in outputs:
    print(x,",")
print('-------------------')
outputs = target_recommendations(exercise_name,cosine_sim4)
for x in outputs:
    print(x,",")

#print(outputs)