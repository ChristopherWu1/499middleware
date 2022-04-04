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
exercises = exercises.applymap(lambda x: x.rstrip() if isinstance(x, str) else x)

def create_cosine_similarities(categories,weight = None, df = exercises):
    if weight == None:
        weight = np.full(len(categories),np.float64(1.0/len(categories)))
    #print(df)
    if len(categories) > 1:
        #print('multiple weights are involved')
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
        weighted_sim = sims[0] * weight[0]
        #print(weighted_sim)
        theCount = 0
        for x,y in zip(sims,weight):
            #print(x,y,len(x))
            #print('0---0-0-0-0-0-0-')
            if theCount > 0:
                #print(x,y)
                weighted_sim = weighted_sim +  (x * y)
                #print(weighted_sim)
            theCount = theCount + 1
            
        #weighted_sim = weighted_sim / len(sims)
        return weighted_sim
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

def target_recommendations(title,sim, df = exercises):
    #print(df)
    titles = df['Name']
    indices = pd.Series(df.index, index = df['Name'])
    idx = indices[title]
    sim_scores = list(enumerate(sim[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[1:21]
    movie_indices = [i[0] for i in sim_scores]
    return titles.iloc[movie_indices]

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
top5_ratings_scores = getTop5ByRatings()
arr2 = []
print('Top 5 exercises based on average ratings')
for x,y in zip(top5_ratings_scores.index,top5_ratings_scores):
    arr2.append(x)
    print(x,y,",")
#print(arr2)
print('---------------')
top5_count = getTop5ByCount()
arr3 = []
print('Top 5 most popular exercises')
for x,y in zip(top5_count['Exercise'],top5_count['count']):
    arr3.append(x)
    print(x,y,",")
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
        print('-------------')
        df = df[:-1]
        #print(df)
    

user_list = ['Gym','Home','Both','Special']
muscle_list = ['Quadriceps' ,'Hamstrings' ,'Glutes' ,'Lower Back' ,'Upper Back' ,'Shoulders','Chest' ,'Shoulder' ,'Abdominals', 'Bicep' ',Lungs' ,'Tricep']
legs = ['Quadriceps' ,'Hamstrings' ,'Glutes']

day1_arr= [['Quadriceps','Press'],['Chest','Press'],['Shoulder','Press']]


exercise_name = sys.argv[2].lower().capitalize() #standardize exercise name

col = sys.argv[3].lower()
#print(col)
print('Hello  ',sys.argv[1],'. These are the exercises similar to ', exercise_name, 'using',sys.argv[3].lower(),"as the similarity:,") 
arr = []
arr.append(sys.argv[3])

exercises = pd.read_csv('exercises3.csv')
exercises = exercises.applymap(lambda x: x.rstrip() if isinstance(x, str) else x)

outputs = target_recommendations(exercise_name,create_cosine_similarities(arr))

for x in outputs:
    print(x,",")
print('-------------------,')

print('These are the top 5 exercises by average user ratings,')
getTop5ByRatings()
print('---------------,')
print('These are the top 5 exercises by popularity,')
getTop5ByCount()

user1 = ['Strength','Beginner','Gym']
template_recommendations(day1_arr,user1)
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