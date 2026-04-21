from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from modules.health.routes.health_routes import health_router
from modules.vectorization.routes.vectorization_routes import vectorization_router
from shared.config.settings import get_settings

settings = get_settings()

app = FastAPI(title=settings["service_name"])

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "AI Book Reader Python API is running..."}


app.include_router(health_router)
app.include_router(vectorization_router)


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", port=settings["port"], reload=True)
