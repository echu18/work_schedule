class Api::TechniciansController < ApplicationController
    def index
        @technicians = Technician.all
    end

    
    def show
        @technician = Technician.find(params[:id])
        render :show
    end


    def create        
        @technician = Technician.new(technician_params)
        
        if @technician.save
            render :show
        else
            render json: @technician.errors.full_messages, status: 401
        end
    end


    def import_data
        @import_data = JSON.parse(params[:import_data])

        if @import_data && @import_data.length > 0
            @import_data.each do |import|
                
                filtered_params = {id: import["id"], name: import["name"]}
            
                @technician = Technician.new(filtered_params)

                if !@technician.save
                    render json: @technician.errors.full_messages, status: 401
                return;
                end
            end
        end
        render :show
    end


    def update
        @technician = Technician.find_by(id: params[:id])

        if @technician && @technician.update_attributes(technician_params)
            render :show
        elsif !@technician
            render json: ['Could not find technician'], status: 400
        else
            render json: @technician.errors.full_messages, status: 401
        end
    end


    def destroy
        @technician = Technician.find(params[:id])
        if @technician
            @technician.destroy
            render :show
        else
            render ['Could not find technician']
        end
    end

    private

    def technician_params
        params.require(:technician).permit(:id, :name)
    end
end
