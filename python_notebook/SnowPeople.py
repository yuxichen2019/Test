class Shape:

    def __init__(self, cvns, points):
        self.cvns = cvns

        self.points = points

        self.pid = None

    def delete(self):
        if self.pid:
            self.cvns.delete(self.pid)


class ShapeAngles(Shape):

    def __init__(self, cvns, points, angles=(10, 170)):
        super().__init__(cvns, points)

        self.angles = {'start': angles[0], 'extent': angles[1]}


class HatTop(Shape):

    def draw(self):
        self.pid = self.cvns.create_oval(*self.points)


class HatBottom(Shape):

    def draw(self):
        self.pid = self.cvns.create_polygon(*self.points)


class Hat:

    def __init__(self, cvns, start_point, w, h):
        self.cvns = cvns

        self.start_point = start_point

        self.w = w

        self.h = h

        self.ht = HatTop(self.cvns, self.ht_cacu())

        self.hb = HatBottom(self.cvns, self.hb_cacu())

    def draw(self):
        self.ht.draw()

        self.hb.draw()

    def delete(self):
        self.ht.delete()

        self.hb.delete()

    def ht_cacu(self):
        r = self.h / 3 / 2

        x1 = self.start_point[0] + self.w / 2 - r

        y1 = self.start_point[1]

        x2 = x1 + 2 * r

        y2 = y1 + 2 * r

        return x1, y1, x2, y2

    def hb_cacu(self):
        x1 = self.start_point[0] + self.w / 2

        y1 = self.start_point[1] + self.h / 3

        x2 = self.start_point[0] + self.w / 3

        y2 = self.start_point[1] + self.h

        x3 = self.start_point[0] + self.w / 3 * 2

        y3 = y2

        return x1, y1, x2, y2, x3, y3


class Sense(ShapeAngles):

    def draw(self):
        self.pid = self.cvns.create_arc(*self.points, **self.angles)


class Face(HatTop):
    pass


class Head:

    def __init__(self, cvns, start_point, w, h):
        self.cvns = cvns

        self.start_point = start_point

        self.w = w

        self.h = h

        eye0_points = self.eye0_cacu()

        dx = self.h / 3 + self.h / 9

        eye1_points = (eye0_points[0] + dx, eye0_points[1],

                       eye0_points[2] + dx, eye0_points[3])

        self.face = Face(self.cvns, self.face_cacu())

        self.eye0 = Sense(self.cvns, eye0_points)

        self.eye1 = Sense(self.cvns, eye1_points)

        self.mouth = Sense(self.cvns, self.mouth_cacu(), (-10, -170))

    def draw(self):
        self.face.draw()

        self.eye0.draw()

        self.eye1.draw()

        self.mouth.draw()

    def face_cacu(self):
        x1 = self.start_point[0] + (self.w - self.h) / 2

        y1 = self.start_point[1]

        x2 = x1 + self.h

        y2 = y1 + self.h

        return x1, y1, x2, y2

    def eye0_cacu(self):
        left_point = (self.start_point[0] + (self.w - self.h) / 2, self.start_point[1])

        x1 = left_point[0] + self.h / 6

        y1 = left_point[1] + self.h / 3

        x2 = x1 + self.h / 3

        y2 = left_point[1] + self.h / 2

        return x1, y1, x2, y2

    def mouth_cacu(self):
        left_point = (self.start_point[0] + (self.w - self.h) / 2, self.start_point[1])

        x1 = left_point[0] + self.h / 3

        y1 = left_point[1] + 2 * self.h / 3

        x2 = x1 + self.h / 3

        y2 = y1 + self.h / 3 / 2

        return x1, y1, x2, y2


class BodyOutline(HatTop):
    pass


class Button(HatTop):
    pass


class Body:

    def __init__(self, cvns, start_point, w, h):

        self.cvns = cvns

        self.start_point = start_point

        self.w = w

        self.h = h

        self._button_size = 10

        self.buttons = []

        self.bo = BodyOutline(self.cvns, self.body_cacu())

        for pnts in self.all_button_points():
            self.buttons.append(Button(self.cvns, pnts))

    def draw(self):

        self.bo.draw()

        for bttn in self.buttons:
            bttn.draw()

    def body_cacu(self):

        x1, y1 = self.start_point

        x2 = x1 + self.w

        y2 = y1 + self.h

        return x1, y1, x2, y2

    def button0_cacu(self):

        x1 = self.start_point[0] + self.w / 2 - self._button_size

        y1 = self.start_point[1] + self.h / 5 - self._button_size

        x2 = x1 + 2 * self._button_size

        y2 = y1 + 2 * self._button_size

        return x1, y1, x2, y2

    def move_dy(self, points, size):

        y1 = points[1] + size

        y2 = points[3] + size

        return points[0], y1, points[2], y2

    def all_button_points(self):

        b0_points = self.button0_cacu()

        size = self.h / 5

        points = []

        for i in range(4):
            points.append(self.move_dy(b0_points, i * size))

        return points

    def set_button_size(self, size):

        self._button_size = size


class Snow:

    def __init__(self, cvns, points, w=150, h=450):
        self.cvns = cvns

        self.points = points

        self.w = w

        self.h = h

        self.hat = Hat(self.cvns, self.points, self.w, self.h / 6)

        self.head = Head(self.cvns, (self.points[0], self.points[1] + self.h / 6), self.w, self.h / 3)

        self.body = Body(self.cvns, (self.points[0], self.points[1] + self.h / 2), self.w, self.h / 2)

    def draw(self):
        self.hat.draw()

        self.head.draw()

        self.body.draw()


if __name__ == '__main__':
    import tkinter

    root = tkinter.Tk()

    cvns = tkinter.Canvas(root, width=600, height=665, bg='white')

    cvns.pack()

    snow = Snow(cvns, (10, 5), 300, 660)

    snow = snow.draw()

    root.mainloop()

