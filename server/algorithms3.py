from nturl2path import url2pathname
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
import numpy as np
import pandas as pd
import sys
print('test')

tf = TfidfVectorizer(analyzer='word',ngram_range=(1, 2),min_df=0, stop_words='english') #transforms text to feature vectors that can be used as input to estimator.
exercises = pd.read_csv('exercises3.csv')
exercises = exercises.applymap(lambda x: x.rstrip() if isinstance(x, str) else x)#strips trailing whitespace if it exists

'''
create n'th degree array(array of n arrays with n elements) of values from 1.0 to zero based on how alike 2 terms are. n = length of column of df

-use tf-idf vectorizer for most of categories except for difficulty and location, those are categorical data and uses our made methods.
'''
def create_cosine_similarities(categories,weight = None, df = exercises):
    #if no weights are submitted, then divide one by the length of catergories to weight each category equally 
    if weight == None:
        weight = np.full(len(categories),np.float64(1.0/len(categories)))
    if len(categories) > 1:#if more than one category is sumbitted
        sims = []
        for x in categories:
            if x == 'Difficulty':
                theList = df['Difficulty'].tolist()
                cosine_sim = convert_difficulty(theList)
                sims.append(cosine_sim)

            elif x == 'Location':
                theList = df['Location'].tolist()
                cosine_sim = convert_location(theList)
                sims.append(cosine_sim)
            else:
                tfidf_matrix = tf.fit_transform(df[x])
                cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)
                sims.append(cosine_sim)
            #sims.append(cosine_sim)
        weighted_sim = sims[0] * weight[0]#starts at the first category
        theCount = 0
        for x,y in zip(sims,weight):#loops through the rest to weight them differently
            #print(x,y,len(x))
            #print('0---0-0-0-0-0-0-')
            if theCount > 0:
                #print(x,y)
                weighted_sim = weighted_sim +  (x * y)#matrix multiplication then addition
            theCount = theCount + 1
        return weighted_sim
    #single category considered
    elif categories[0] == 'Difficulty':
        theList = df['Difficulty'].tolist()
        cosine_sim = convert_difficulty(theList)
        return cosine_sim
    elif categories[0] == 'Location':
        theList = df['Location'].tolist()
        cosine_sim = convert_location(theList)
        return cosine_sim
    else:
        tfidf_matrix = tf.fit_transform(df[categories[0]]) #gets if-idf values
        cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix) #calculate a numeric quantity that denotes the similarity between two movies. Higher the cosine value, the more similar the terms are
        return cosine_sim
'''
function to return n'th degree array of values from  1 to  0 based off the difficulty. 

-possibilities for difficulty: Beginner, Intermediate, Advanced. 

-if values are the same, returns 1

-if value1 beginner and value2 is intermediate, and vice versa, returns 0.5
-if value1 intermediate and value2 is Advanced, and vice versa, returns 0.5

-if value1 beginner and value2 is Advanced, and vice versa, returns 0.25
'''
def convert_difficulty(aList):
    return_list = []
    #print(aList)
    for x in aList:
        element_list = []
       # print(element_list)
        for y in aList:
            #print(x,y)
            if x == 'Beginner' and y == 'Beginner':
                #print('same value, beginner')
                element_list.append(np.float64(1.0))
            elif x == 'Intermediate' and y == 'Intermediate':
                #print('same value, inter')
                element_list.append(np.float64(1.0))
            elif x == 'Advanced' and y == 'Advanced':
                #print('same value, advanced')
                element_list.append(np.float64(1.0))
            elif x == 'Beginner' and y == 'Intermediate':
                #print('different value')
                element_list.append(np.float64(0.5))
            elif x == 'Beginner' and y == 'Advanced':
                #print('different value')
                element_list.append(np.float64(0.25))
            elif x == 'Intermediate' and y == 'Beginner':
                #print('different value')
                element_list.append(np.float64(0.5))
            elif x == 'Intermediate' and y == 'Advanced':#pontentially a problem
                #print('different value')
                element_list.append(np.float64(0.5))
            elif x == 'Advanced' and y == 'Intermediate':
                #print('different value')
                element_list.append(np.float64(0.5))
            elif x == 'Advanced' and y == 'Beginner':
                #print('different value')
                element_list.append(np.float64(0.25))
        #print(element_list)
            #element_list = np.array(element_list)
        return_list.append(element_list)
    return_list = np.array(return_list)
    return return_list

#returns the list of exercises closest to the given exercise based off the cosine similarities. 
def target_recommendations(title,sim, df = exercises):
    #print(df)
    titles = df['Name']#gets column of just names
    indices = pd.Series(df.index, index = df['Name'])#turns it into a series
    idx = indices[title]#gets the n'th degree array of exercise
    sim_scores = list(enumerate(sim[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)#makes a list of values in sim_scores, from highest to lowest
    sim_scores = sim_scores[1:21]#gets first 20 values
    movie_indices = [i[0] for i in sim_scores]
    return titles.iloc[movie_indices]#returns titles of exercises

#give recommendations with some of the reccomended exercises being preset
def give_set_recommendations(title,sim,num,arr, df = exercises):
    arr2 = []
    titles = df['Name']
    indices = pd.Series(df.index, index = df['Name'])
    idx = indices[title]
    sim_scores = list(enumerate(sim[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[1:21]
    movie_indices = [i[0] for i in sim_scores]
    names2 =  titles.iloc[movie_indices]
    
    count = 0
    for x in names2:
        print(x)
        if not x in arr or x in arr2:
            #print('exericse already in template')
            arr2.append(x)
        
    return arr2[:num]+ arr

list_of_excercises = pd.read_csv('listExercises.csv')#read exercise list
list_of_excercises = list_of_excercises.applymap(lambda x: x.rstrip() if isinstance(x, str) else x)#get rid of trailing spaces
#print(list_of_excercises)

#gets top 5 exercise by average user ratings
def getTop5ByRatings():
    #print(list_of_excercises)
    means = list_of_excercises.groupby(['Exercise']).mean()#group by excerise and get the means
    #print(means.columns)
    rating_descending = means.sort_values(by=['Rating'], ascending=False)#sort by the ratings in descending order
    #print(lols['Exercise'][:5])
    #print(rating_descending[:5])
    top5_ratings_scores  = rating_descending['Rating'][:5]
    #print(top5_ratings_scores)

    for x,y in zip(top5_ratings_scores.index,top5_ratings_scores):
        print(x,y,',')
    
    return top5_ratings_scores

#get top 5 exercises by popularity
def getTop5ByCount():
    counts =  list_of_excercises.groupby(['Exercise']).size().reset_index(name='count')
    #print(counts)
    count_descending = counts.sort_values(by=['count'], ascending=False)#sort by the ratings in descending order
    #print(count_descending)
    top5_count = count_descending[:5]
    
    for x,y in zip(top5_count['Exercise'],top5_count['count']):
        print(x,y,",")
    
    return top5_count

'''
function to return n'th degree array of values from  1 to  0 based off the location. 

-possibilities for difficulty: Gym, Home, Both(Gym and Home), Special. 

-if values are the same, returns 1

-if value1 Gym and value2 is Home, and vice versa, returns 0.25
-if value1 Gym and value2 is Both, and vice versa, returns 1.0
-if value1 Gym and value2 is Special, and vice versa, returns 0.25


-if value1 Home and value2 is Both, and vice versa, returns 1.0
-if value1 Home and value2 is Special, and vice versa, returns 0.25

-if value1 Special and value2 is Both, and vice versa, returns 0.25
'''
def convert_location(aList):
    return_list = []
    #print(aList)
    for x in aList:
        element_list = []
       # print(element_list)
        for y in aList:
            #print(x,y)
            if x == 'Both' and y == 'Both':
                #print('same value, beginner')
                element_list.append(np.float64(1.0))
            elif x == 'Gym' and y == 'Gym':
                #print('same value, inter')
                element_list.append(np.float64(1.0))
            elif x == 'Special' and y == 'Special':
                #print('same value, advanced')
                element_list.append(np.float64(1.0))
            elif x == 'Home' and y == 'Home':
                element_list.append(np.float64(1.0))
            elif x == 'Both' and y == 'Gym':#both emcompasses gym and home
                #print('different value')
                element_list.append(np.float64(1.0))
            elif x == 'Both' and y == 'Special':
                #print('different value')
                element_list.append(np.float64(0.25))
            elif x == 'Both' and y == 'Home':
                #print('different value')
                element_list.append(np.float64(1.0))
            elif x == 'Gym' and y == 'Both':
                #print('different value')
                element_list.append(np.float64(1.0))
            elif x == 'Gym' and y == 'Special':#pontentially a problem
                #print('different value')
                element_list.append(np.float64(0.25))
            elif x == 'Gym' and y == 'Home':#pontentially a problem
                #print('different value')
                element_list.append(np.float64(0.25))
            elif x == 'Special' and y == 'Both':
                #print('different value')
                element_list.append(np.float64(0.25))
            elif x == 'Special' and y == 'Gym':
                #print('different value')
                element_list.append(np.float64(0.25))
            elif x == 'Special' and y == 'Home':
                #print('different value')
                element_list.append(np.float64(0.25))
            elif x == 'Home' and y == 'Both':
                #print('different value')
                element_list.append(np.float64(1.0))
            elif x == 'Home' and y == 'Gym':
                #print('different value')
                element_list.append(np.float64(0.25))
            elif x == 'Home' and y == 'Special':
                #print('different value')
                element_list.append(np.float64(0.25))  
        #print(element_list)
        #element_list = np.array(element_list)
        #print(len(element_list))
        return_list.append(element_list)
    #print(len(return_list))
    return_list = np.array(return_list)
    return return_list



exercises = pd.read_csv('exercises3.csv')
exercises = exercises.applymap(lambda x: x.rstrip() if isinstance(x, str) else x)

'''
Give recommendations based of set templates from the database

exercise_arr will give preset exercise categories 
Ex. day1_arr= [['Quadriceps','Press'],['Chest','Press'],['Shoulder','Press']]

user_arr will give other preset data from the user profile or inputted information 
Ex. user1 = ['Strength','Beginner','Gym']

for every exercise in list:
-create a dummy exercise that is pushed into the dataframe and acts as a node to compare it to
-gives the recommendations for those exercise
-removes the dummy exercise
'''
def template_recommendations(exercise_arr,user_arr):
    df = exercises
    for x in exercise_arr:
        #print(x)
        df2 = {'Name': 'Dummy','Target Area' : '', 'Target Muscle': x[0], 'Exercise Category':  user_arr[0], 'Difficulty' : '','Push Pull Stretch Aerobic': x[1],  'Equipment Type( gym, home , specific )' : '', 'Location': user_arr[2] , 'Url' :''}
        #print(df2)
        df = df.append(df2, ignore_index = True)
        #have to send df to function
        #print(df.iloc[[0, -1]])
        #print(len(df.index))
        print(x[0],':',x[1],',')
        recommendations = target_recommendations('Dummy',create_cosine_similarities(['Target Muscle','Exercise Category','Push Pull Stretch Aerobic','Location'],None,df ),df )
        #print(target_recommendations('Dummy',create_cosine_similarities(['Target Muscle','Exercise Category','Push Pull Stretch Aerobic','Location'],None,df ),df ))
        #print(recommendations)
        for y in recommendations:
            print(y,",")
        print('-------------,')
        df = df[:-1]
        #print(df)
    

user_list = ['Gym','Home','Both','Special']
muscle_list = ['Quadriceps' ,'Hamstrings' ,'Glutes' ,'Lower Back' ,'Upper Back' ,'Shoulders','Chest' ,'Shoulder' ,'Abdominals', 'Bicep' ',Lungs' ,'Tricep']
legs = ['Quadriceps' ,'Hamstrings' ,'Glutes']

day1_arr= [['Quadriceps','Press'],['Chest','Press'],['Shoulder','Press']]


#doesnt work for 2 or more words
exercise_name = sys.argv[2].lower().title() #standardize exercise name

#exercise_name = sys.argv[2] #standardize exercise name
col = sys.argv[3].lower()
#print(col)
exer = '( '
for x in sys.argv[4:10]:
    if x != "":
        exer += x + " | "
exer = exer[:-2] + ')'
    
print('Hello  ',sys.argv[1],'. These are the exercises similar to ', exercise_name, 'using',exer,"as the similarity:,") 


exercises = pd.read_csv('exercises3.csv')
exercises = exercises.applymap(lambda x: x.rstrip() if isinstance(x, str) else x)

target_arr = []
weight_arr = []
if sys.argv[16] == 'Yes':
    print('yes,')
    for x,y in zip(sys.argv[4:10],sys.argv[10:16]):
        #print(x,y,",")
        if x != "":
            num = int(y)
            num = num/100
            target_arr.append(x)
            weight_arr.append(num)
    #print(target_arr,weight_arr)
    print('------------------|,')
    outputs = target_recommendations(exercise_name,create_cosine_similarities(target_arr,weight_arr))
    for x in outputs:
        #url = exercises.loc[exercises['Name'] == x, 'Url'].iloc[0]
        #print(url)
        print(x,",")

else:
    print('no,')
    for x in sys.argv[4:10]:
        #print(x,",")
        if x != "":
            target_arr.append(x)
    #print(target_arr)
    print('----------------,')
    outputs = target_recommendations(exercise_name,create_cosine_similarities(target_arr))
    for x in outputs:
        print(x,",")

'''
#outputs = target_recommendations(exercise_name,create_cosine_similarities(arr))
for x in outputs:
    print(x,",")
'''
print('-------------------,')

print('These are the top 5 exercises by average user ratings,')
getTop5ByRatings()
print('---------------,')
print('These are the top 5 exercises by popularity,')
getTop5ByCount()

user1 = ['Strength','Beginner','Gym']
print('---------------,')
print('these are the template recommendations')
template_recommendations(day1_arr,user1)


'''
print(target_arr)
print('----------')
print(sys.argv[10:16])
print(sys.argv[16])
'''
'''
target_arr = []
weight_arr = []

exercises = pd.read_csv('exercises3.csv')
exercises = exercises.applymap(lambda x: x.rstrip() if isinstance(x, str) else x)
if sys.argv[16] == 'Yes':
    for x,y in zip(sys.argv[4:10],sys.argv[10:16]):
        #print(x,y,",")
        if x != "":
            num = int(y)
            num = num/100
            target_arr.append(x)
            weight_arr.append(num)
    #print(target_arr,weight_arr)
    print('----------,')
    outputs = target_recommendations(exercise_name,create_cosine_similarities(target_arr,weight_arr))
    for x in outputs:
        url = exercises.loc[exercises['Name'] == x, 'Url'].iloc[0]
        #print(url)
        print(x,",")


if sys.arv[16] == 'No':
    for x in sys.argv[4:10]:
        print(x,",")
        if x != "":
            target_arr.append(x)
    print(target_arr)
    print('----------,')
    outputs = target_recommendations(exercise_name,create_cosine_similarities(target_arr))
    for x in outputs:
        print(x,",")

'''
#outputs = target_recommendations(exercise_name,create_cosine_similarities(target_arr))



'''
print('--------[==-=-=-=-,')

user1 = ['Strength','Beginner','Both']
template_recommendations(day1_arr,user1)

print('--------[==-=-=-=-,')


user1 = ['Strength','Beginner','Home']
template_recommendations(day1_arr,user1)

print('--------[==-=-=-=-,')
user1 = ['Strength','Beginner','Special']
template_recommendations(day1_arr,user1)
'''