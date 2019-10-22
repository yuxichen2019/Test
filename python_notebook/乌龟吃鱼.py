import random as r
legal_x = [0,10]
legal_y = [0,10]

class Turtle:
    def __init__(self):
        #初始体力100
        self.power = 100
        #初始位置随机
        self.x = r.randint(legal_x[0],legal_x[1])
        self.y = r.randint(legal_y[0],legal_y[1])

    def move(self):
        new_x = self.x + r.choice([1,2,-1,-2])
        new_y = self.y + r.choice([1,2,-1,-2])

        if new_x < legal_x[0]:
            self.x = legal_x[0] - (new_x - legal_x[0])
        elif new_x > legal_x[1]:
            self.x = legal_x[1] - (new_x - legal_x[0])
        else:
            self.x = new_x            

        if new_y < legal_y[0]:
            self.y = legal_y[0] - (new_y - legal_y[0])
        elif new_y > legal_y[1]:
            self.y = legal_y[1] - (new_y - legal_y[1])
        else:
            self.y = new_y

        self.power -=1
        return(self.x,self.y)

    def eat(self):
        self.power += 20
        if self.power>100:
            self.power = 100


            
class Fish:
    
    def __init__(self):
        self.x = r.randint(legal_x[0],legal_x[1])
        self_y = r.randint(legal_y[0],legal_y[1])

    def move(self):
        new_x = self.x +r.choice([1,-1])
        new_y = self.y +r.choice([1,-1])

        if new_x < legal_x[0]:
            self.x = legal_x[0] - (new_x - legal_x[0])
        elif new_x > legal_x[1]:
            self.x = legal_x[1] - (new_x - legal_x[1])
        else:
            self.x = new_x            

        if new_y < legal_y[0]:
            self.y = legal_y[0] - (new_y - legal_y[0])
        elif new_y > legal_y[1]:
            self.y = legal_y[1] - (new_y - legal_y[1])
        else:
            self.y = new_y
            
        return (self.x,self.y)

turtle = Turtle()
fish = []
for i in range(10):
    new_fish = Fish()
    fish.append(new_fish)
    
while True:
    if len(fish) == 0:
        print('鱼儿都被吃完啦~~~~')
        break
        
    if turtle.power == 0:
        print('小乌龟累死啦~~~~~')
        break
    
    pos = turtle.move()
    
    for each_fish in fish[:]:
        if each_fish.move() == pos:            
            turtle.eat()
            fish.remove(each_fish)
            print('鱼儿被吃掉咯~~~')
            
        
        
        
    
