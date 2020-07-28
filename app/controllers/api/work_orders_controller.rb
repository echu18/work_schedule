
class Api::WorkOrdersController < ApplicationController
    include Rails.application.routes.url_helpers
    require 'date'

    def index
        @work_orders = Work_order.all
    end

    
    def show
        @work_order = Work_order.find(params[:id])
        render :show
    end


    def create
        filtered_params = work_order_params
        filtered_params[:time] = DateTime.strptime(work_order_params[:time], '%m/%d/%y %H:%M')
      
        @work_order = WorkOrder.new(filtered_params)

        if @work_order.save
            render :show
        else
            render json: @work_order.errors.full_messages, status: 401
        end
    end


    def import_data
        debugger
        @import_data = JSON.parse(params[:import_data])


        if @import_data && @import_data.length > 0
            @import_data.each do |import|
                
                filtered_params = {id: import["id"], technician_id: import["technician_id"], location_id: import["location_id"], time: DateTime.strptime(import["time"], '%m/%d/%y %H:%M'),
                                    duration: import["duration"], price: import["price"]}

                # filtered_params[:time] = DateTime.strptime(import[:time], '%m/%d/%y %H:%M')
            
                @work_order = WorkOrder.new(filtered_params)

                if @work_order.save
                    # render :show
                else
                    render json: @work_order.errors.full_messages, status: 401
                end
                
            end
        end
    end


    def update
        @work_order = Work_order.find_by(id: params[:id])

        if @work_order && @work_order.update_attributes(work_order_params)
            render :show
        elsif !@work_order
            render json: ['Could not find work order'], status: 400
        else
            render json: @work_order.errors.full_messages, status: 401
        end
    end


    def destroy
        @work_order = Work_order.find(params[:id])

        if @work_order
            @work_order.destroy
            render :show
        else
            render ['Could not find work order']
        end
    end

    private

    def work_order_params
        params.require(:work_order).permit(:id, :technician_id, :location_id, :time, :duration, :price)
    end
end





# parsed_time = DateTime.strptime(work_order_params[:time], '%m/%d/%y %H:%M')
# # parsed_time = Time.zone.parse(time)
# @work_order = WorkOrder.new({id: work_order_params[:id], technician_id: work_order_params[:technician_id], location_id: work_order_params[:location_id], time: parsed_time, duration: work_order_params[:duration], price: work_order_params[:price]})


# params.permit(:id, :technician_id, :location_id, :time, :duration, :price)
# params.require(:work_order).permit(:id, :technician_id, :location_id, time: DateTime.strptime(params[:time], '%m/%d/%y %H:%M'), :duration, :price)
