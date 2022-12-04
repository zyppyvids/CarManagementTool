from ninja import Router, Schema
from .models import CarModel, Car, CarMake
from django.http import Http404
from typing import List
from asgiref.sync import sync_to_async

carMakeRouter = Router()
carModelRouter = Router()
carRouter = Router()

class CarMakeDto(Schema):
    id: int
    name: str

class CarMakeCreateOrUpdateDto(Schema):
    name: str

class CarModelDto(Schema):
    id: int
    model: str
    year: str
    carmakeid_id: int = None

class CarModelCreateOrUpdateDto(Schema):
    model: str
    year: str
    carmakeid_id: int = None

class CarDto(Schema):
    id: int
    VIN: str
    carplate: str
    modelid_id: int

class CarCreateOrUpdateDto(Schema):
    VIN: str
    carplate: str
    modelid_id: int = None


class CarMakes:
    @carMakeRouter.get("", response = List[CarMakeDto])
    def search(request, id: int = None, name: str = None):
        try:
            makes = CarMake.objects.all()

            if(name != None):
                makes = makes.filter(name = name)
            if(id != None):
                makes = makes.filter(pk = id)

            return makes
        except CarMake.DoesNotExist:
            raise Http404

    @carMakeRouter.get("/{id}", response = CarMakeDto)
    async def get_by_id(request, id: int):
        try:
            return await CarMake.objects.aget(pk = id)
        except CarMake.DoesNotExist:
            raise Http404

    @sync_to_async
    @carMakeRouter.get("/getAll/", response = List[CarMakeDto])
    def get_all(request):
            return CarMake.objects.all()

    @carMakeRouter.post("/create/", response = CarMakeDto)
    async def create_new(request, payload: CarMakeCreateOrUpdateDto):
        newCarMake = await CarMake.objects.acreate(**payload.dict())
        return await CarMake.objects.aget(pk = newCarMake.id)

    @sync_to_async
    @carMakeRouter.put("/{id}", response = CarMakeDto)
    def update_existing(request, id: int, payload: CarMakeCreateOrUpdateDto):
        existingCarMake = CarMake.objects.get(pk = id)
        
        for attr, value in payload.dict().items():
            setattr(existingCarMake, attr, value)
        
        existingCarMake.save()
        
        return CarMake.objects.get(pk = existingCarMake.id)
    
    @sync_to_async
    @carMakeRouter.delete("/{id}")
    def delete_existing(request, id: int):
        try:
            existingCarMake = CarMake.objects.get(pk = id)
            existingCarMake.delete()
            
            return { "Success": True }
        except:
            return { "Success": False }

class CarModels:
    @carModelRouter.get("", response = List[CarModelDto])
    def search(request, id: int = None, model: str = None, year: str = None):
        try:
            models = CarModel.objects.all()

            if(model != None):
                models = models.filter(model = model)
            if(year != None):
                models = models.filter(year = year)
            if(id != None):
                models = models.filter(pk = id)

            return models
        except CarModel.DoesNotExist:
            raise Http404

    @carModelRouter.get("/{id}", response = CarModelDto)
    async def get_by_id(request, id: int):
        try:
            return await CarModel.objects.aget(pk = id)
        except CarModel.DoesNotExist:
            raise Http404

    @carModelRouter.get("/getAll/", response = List[CarModelDto])
    def get_all(request):
            return CarModel.objects.all()

    @carModelRouter.post("/create/", response = CarModelDto)
    async def create_new(request, payload: CarModelCreateOrUpdateDto):
        newCarModel = await CarModel.objects.acreate(**payload.dict())
        return await CarModel.objects.aget(pk = newCarModel.id)
    
    @sync_to_async
    @carModelRouter.put("/{id}", response = CarModelDto)
    def update_existing(request, id: int, payload: CarModelCreateOrUpdateDto):
        existingCarModel = CarModel.objects.get(pk = id)
        
        for attr, value in payload.dict().items():
            setattr(existingCarModel, attr, value)
        
        existingCarModel.save()
        
        return CarModel.objects.get(pk = existingCarModel.id)

    @sync_to_async
    @carModelRouter.delete("/{id}")
    def delete_existing(request, id: int):
        try:
            existingCarModel = CarModel.objects.get(pk = id)
            existingCarModel.delete()
            
            return { "Success": True }
        except:
            return { "Success": False }

class Cars:
    @carRouter.get("", response = List[CarDto])
    def search(request, id: int = None, carplate: str = None, VIN: str = None):
        try:
            cars = Car.objects.all()

            if(VIN != None):
                cars = cars.filter(VIN = VIN)
            if(carplate != None):
                cars = cars.filter(carplate = carplate)
            if(id != None):
                cars = cars.filter(pk = id)

            return cars
        except Car.DoesNotExist:
            raise Http404

    @carRouter.get("/{id}", response = CarDto)
    async def get_by_id(request, id: int):
        try:
            return await Car.objects.aget(pk = id)
        except Car.DoesNotExist:
            raise Http404

    @carRouter.get("/getAll/", response = List[CarDto])
    def get_all(request):
            return Car.objects.all()

    @carRouter.post("/create/", response = CarDto)
    async def create_new(request, payload: CarCreateOrUpdateDto):
        newCar = await Car.objects.acreate(**payload.dict())
        return await Car.objects.aget(pk = newCar.id)
    
    @sync_to_async
    @carRouter.put("/{id}", response = CarDto)
    def update_existing(request, id: int, payload: CarCreateOrUpdateDto):
        existingCar = Car.objects.get(pk = id)
        
        for attr, value in payload.dict().items():
            setattr(existingCar, attr, value)
        
        existingCar.save()
        
        return Car.objects.get(pk = existingCar.id)

    @sync_to_async
    @carRouter.delete("/{id}")
    def delete_existing(request, id: int):
        try:
            existingCar = Car.objects.get(pk = id)
            existingCar.delete()
            
            return { "Success": True }
        except:
            return { "Success": False }